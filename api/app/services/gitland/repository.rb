module Gitland
  class Repository
    def initialize(repository)
      @repository = repository
    end

    def clone
      Commands::Clone.new(@repository).execute
    end

    def pull
      Commands::Pull.new(@repository).execute
    end

    def log(latest_commit_hash: nil, format: nil, first_parent: false)
      Commands::Log.new(@repository, latest_commit_hash: latest_commit_hash, format: format, first_parent: first_parent).execute { |logs| yield logs }
    end

    def destroy
      FileUtils.remove_dir(disk_path, force: true)
    end

    def list_all_files_with_size
      sha_a = Commands::Diff::EMPTY_DIRECTORY_TREE_HASH
      sha_b = Commands::Diff::HEAD

      Commands::Diff
        .new(@repository, sha_a: sha_a, sha_b: sha_b)
        .execute
        .lines
        .map! do |line|
          line_count, _, filepath = line.strip.split

          {
            filepath: filepath,
            line_count: line_count.to_i
          }
        end
    end

    def file_line_count(filepath)
      sha_a = Commands::Diff::EMPTY_DIRECTORY_TREE_HASH
      sha_b = Commands::Diff::HEAD

      line = Commands::Diff
        .new(@repository, filepath: filepath, sha_a: sha_a, sha_b: sha_b)
        .execute
        .lines
        .first

      line.strip.split.first.to_i
    end

    private

    def disk_path
      Gitland::Storage.new(@repository).absolute_path
    end
  end
end
