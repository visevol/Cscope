module Gitland
  class Repository
    def initialize(repository)
      @repository = repository
    end

    def clone
      Commands::Clone.new(@repository).execute
    end

    def log(format: nil, first_parent: false)
      Commands::Log.new(@repository, format: format, first_parent: first_parent).execute { |logs| yield logs }
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
  end
end
