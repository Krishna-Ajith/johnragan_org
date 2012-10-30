class Foo
  attr_reader :bark_read
  attr_writer :bark_write
  attr_accessor :bark_all

  attr :bark_reader2
  attr :bark_reader_writer, true

  PERSISTENT_ATTRIBUTES = [ :omit_top_line, :omit_top_bar, :omit_advanced_search, :omit_bottom_bar, :omit_summary, :only_result_count, :add_url, :remove_url, :update_partial, :javascript_listener_method, :create_url, :destroy_url, :url, :omit_add_all_button, :omit_remove_all_button, :ignore_less_than_10, :paging_and_sorting_only, :starting_included_count,
    :starting_can_be_added_count,:starting_can_be_removed_count, :starting_not_included_count, :label, :result_id, :update_partial_id, :partition_proxy, :exclude_proxy, :filter, :new_ui,
  ]
  STANDARD_ATTRIBUTES = [ :collection, :search_summary, :model_class, :total_count, :count, :limit, :url, :proxy, :reset_counts,
    :add, :remove, :added_ids, :removed_ids, :sort_by, :page, :terms, :additional, :filter_by_key, :filter_by_value,
    :act_on_results_params, :controller, :method, :search_params, :filter_by, :override_update_partial_id, :override_result_id
  ]

  ATTRIBUTES = PERSISTENT_ATTRIBUTES+STANDARD_ATTRIBUTES
  attr_accessor(*ATTRIBUTES)
  
  def set_bark_read
    @bark_read = "set_value"
  end  
end

foo = Foo.new
foo.bark_all = "bar"
puts foo.bark_all

foo.total_count = 14
puts foo.total_count

foo.set_bark_read
puts foo.bark_read
