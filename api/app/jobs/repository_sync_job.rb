class RepositorySyncJob < ApplicationJob
  queue_as :default

  def perform(repository_id:)
    repository = Repository.find_by(id: repository_id)

    unless repository
      return Rails.logger.info("repository #{repository_id} does not exists.")
    end

    RepositorySyncService.new(repository).index
  end
end
