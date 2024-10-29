require "test_helper"

module Gitland
  module Commands
    class PullTest < ActiveSupport::TestCase
      def setup
        @repository = repositories(:rails)
      end

      test "#execute pulls the repository" do
        disk_path = Gitland::Storage.new(@repository).absolute_path
        repo = mock("Git repository")

        Git.expects(:open).with(disk_path).returns(repo)

        repo.expects(:pull)

        Gitland::Commands::Pull.new(@repository).execute
      end
    end
  end
end
