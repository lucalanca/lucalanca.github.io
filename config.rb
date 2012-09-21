@mainlayout = "layouts/h5b_layout"
with_layout @mainlayout do
	page "/index.html"
	page "/cv.html"
	page "/projects.html"
	page "/timeline.html"
	# page "/blog.html"
end
###
# Blog settings
###
# activate :blog do |blog|
#   blog.permalink = ":title"
#   blog.sources = ":year-:month-:day-:title.html"
#   blog.prefix = "blog"
#   blog.layout = "blog/layout"

#   # blog.taglink = "tags/:tag.html"
#   # blog.summary_separator = "/(READ MORE)/"
#   # blog.summary_length = 250
#   # blog.year_link = ":year.html"
#   # blog.month_link = ":year/:month.html"
#   # blog.day_link = ":year/:month/:day.html"
#   # blog.default_extension = ".markdown"


#   blog.tag_template = "tag.html"
#   blog.calendar_template = "calendar.html"
# end
# page "/feed.xml", :layout => :false
# page "/tag.html", :layout => :false



### 
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
helpers do
  def last_index(arr, idx)
    idx == arr.count - 1 ? "line-through" : nil
  end
end

set :css_dir, 'css'
set :js_dir, 'img'
set :images_dir, 'js'

Encoding.default_external = 'utf-8'

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :cache_buster
  
  # require "middleman-smusher"
  # activate :smusher
  # activate :favicon_maker
end
require 'yajl/json_gem'