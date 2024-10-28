require "test_helper"

module Gitland
  module Commands
    class PullTest < ActiveSupport::TestCase
      def setup
        @repository = repositories(:rails)
      end

      test "#execute pulls the repository" do
        repo = Git.open(Rails.root.join("storage", "gitland", "repositories", "1.git").to_s)
        repo.expects(:pull)

        Git.stubs(:open).returns(repo)

        Gitland::Commands::Pull.new(@repository).execute
      end
    end
  end
end
