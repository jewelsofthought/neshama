// Import filters

// Date
const { DateTime } = require("luxon");

const fs = require("fs");

// Plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");

// For rendering math in Markdown
const katex = require('katex');

// For image rendering
const Image = require('@11ty/eleventy-img');


// Use an async shortcode (different from the traditional shortcode config method) to render images
async function imageShortcode(src, alt) {
	if (alt === undefined) {
		// Throw an error on a missing alt (alt="" works fine)
		throw new Error(`Missing \`alt\` on myImage from: ${src}`);
	}

	let metadata = await Image(src, {
		widths: [300, 600],
		formats: ["png"]
	});

  let data = metadata.png[metadata.png.length - 1];
  return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

// Import transforms (min)

// Import data files
// use _data/site.js (included as module) instead of _data/metadata.json?


//
module.exports = function(eleventyConfig) {

  // Add plugins (filters)
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Add alphabetic sort filter (by title)
	eleventyConfig.addFilter('sortByTitle', values => {
		return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title))
	});

	// Add date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

	// Add math filter
	eleventyConfig.addFilter('latex', content => {
		return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
			const cleanEquation = equation
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')

			return katex.renderToString(cleanEquation, { throwOnError: false })
		})
	});

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1).sort();
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

   eleventyConfig.addCollection("tagList_neshama", function (collection) {
    let tagSet = new Set();
    collection.getFilteredByTags("neshama").forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Sorting by order: in front matter
  // Use: 
  // {%- for post in collections.oikos | sortByOrder -%}
  //   {{ post.data.title }} ({{ post.data.order }})
	// {% endfor %}

  function sortByOrder(values) {
    let vals = [...values];
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  }
  eleventyConfig.addFilter('sortByOrder', sortByOrder); 

	eleventyConfig.addCollection("postsAscending", (collection) =>
		collection.getFilteredByGlob("posts/*.md").sort((a, b) => {
				if (a.data.title > b.data.title) return -1;
				else if (a.data.title < b.data.title) return 1;
				else return 0;
		})
	);

	// To include sass
	// need to add "sass -watch" to package.json
	// eleventyConfig.addWatchTarget("./site/sass/");
	// 
	// For now, just watch the css folder for any changes
	eleventyConfig.addWatchTarget("site/assets/css/");

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("site/references");
  eleventyConfig.addPassthroughCopy("site/assets/css");
  eleventyConfig.addPassthroughCopy("site/assets/img");
  eleventyConfig.addPassthroughCopy("site/assets/js");
  eleventyConfig.addPassthroughCopy("site/posts/img/**/*");
  eleventyConfig.addPassthroughCopy({"site/assets/fontawesome/css/": "assets/fonts/"});
  eleventyConfig.addPassthroughCopy({"site/assets/fontawesome/webfonts/": "assets/webfonts/"});

	// Markdown
	const markdownIt = require("markdown-it");
	const markdownItAnchor = require("markdown-it-anchor");
	const markdownItFootnote = require("markdown-it-footnote");
	const markdownItAttr = require("markdown-it-attrs");
	const markdownItSpan = require("markdown-it-bracketed-spans");

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAttr, {
	leftDeliminator: '{',
	rightDeliminator: '}',
	allowedAttributes: [] // empty array = all attributes allowed 
  }).use(markdownItAnchor, {
	permallink: true,
	permalinkClass: "direct-link",
	permalinkSymbol: "#",
  }).use(markdownItFootnote).use(markdownItSpan);

  markdownLibrary.renderer.rules.footnote_block_open = () => (
	'<h4 class="mt-3">Footnotes</h4>\n' +
	'<section class="footnotes">\n' +
	'<ol class="footnotes-list">\n'
  );

  markdownLibrary.renderer.rules.footnote_caption = (tokens,idx) => {
	let n = Number(tokens[idx].meta.id + 1).toString();

	if (tokens[idx].meta.subId > 0) {
	    n += ":" + tokens[idx].meta.subId;
	}

	return n;
  };	

  eleventyConfig.setLibrary("md", markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('site/404.md');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

	// Use image shortcode to render images
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
};
