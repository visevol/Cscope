class Repository < ApplicationRecord
  has_many :commits
  has_many :source_files

  validates :path, uniqueness: {
    scope: :domain,
    message: ->(object, _) { "#{object.remote_url} already exists." }
  }

  after_create_commit { InitializeRepositoryJob.perform_later(repository_id: id) }
  after_destroy_commit :remove_gitland_repository

  class << self
    def find_by_url(url)
      uri = Addressable::URI.heuristic_parse(url)
      return nil if uri.domain.nil? || uri.path.nil?

      find_by(domain: uri.domain, path: uri.path)
    end

    def from_remote_repository(remote_repository)
      new.tap do |repository|
        repository.name = remote_repository.name
        repository.domain = remote_repository.domain
        repository.path = remote_repository.path
      end
    end
  end

  def remote_url
    Addressable::URI.new.tap do |u|
      u.host = self.domain
      u.path = self.path
      u.scheme = "https"
    end.to_s
  end

  private

  def remove_gitland_repository
    Gitland::Repository.new(self).destroy
  end
end
