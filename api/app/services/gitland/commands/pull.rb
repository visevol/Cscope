module Gitland
    module Commands
      class Pull < GitCommand
        #
        # Executes the `git pull` command.
        #
        # Example:
        #
        #   Gitland::Commands::Pull.new(repository).execute
        #
        def initialize(repository)
          @repository = repository
        end

        def execute
          repo = Git.open(Gitland::Storage.new(@repository).absolute_path)
          repo.pull
        end
      end
    end
end
