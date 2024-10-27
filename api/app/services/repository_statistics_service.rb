class RepositoryStatisticsService
  def initialize(repository)
    @repository = repository
  end

  #
  # Returns a list of point that describes the stream of commit over the
  # lifetime of the repository. Each point represents a date, and a summary of change
  # that happened that date.
  #
  # Each point is an array with this format:
  # [
  #   date,             <-- the date in this format: YYYY-MM-DD
  #   commit count,     <-- the number of commit comitted that day
  #   file changed,     <-- the number of file changed that day
  #   line added        <-- the number of line added that day
  #   line removed      <-- the number of line removed that day
  # ]
  #
  def commits_statistics_by_date(start_date: nil, end_date: nil)
    scope = @repository.commits.on_changes_ledger
    scope = scope.where(committer_date: start_date..) if start_date
    scope = scope.where(committer_date: ..end_date) if end_date
    scope
      .joins(:source_file_changes)
      .group(:committer_date)
      .pluck(
        Arel.sql("strftime('%Y-%m-%d', committer_date)"),
        Arel.sql("count(distinct commits.id)"),
        Arel.sql("count(distinct source_file_changes.source_file_id)"),
        Arel.sql("sum(source_file_changes.additions)"),
        Arel.sql("sum(source_file_changes.deletions)"),
      )
  end
end
