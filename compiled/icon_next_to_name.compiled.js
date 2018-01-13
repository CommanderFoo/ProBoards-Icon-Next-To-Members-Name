"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon_Next_To_Name = function () {
	function Icon_Next_To_Name() {
		_classCallCheck(this, Icon_Next_To_Name);
	}

	_createClass(Icon_Next_To_Name, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pixeldepth_icon_to_name";
			this.settings = {};
			this.users = new Map();
			this.groups = new Map();

			this.setup();

			if (this.users.size == 0 || this.groups.size == 0) {
				return;
			}

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			this.add_icon();

			proboards.on("afterSearch", this.add_icon.bind(this));
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.settings = plugin.settings;

				var images_users = this.settings["images_users"];

				for (var i = 0; i < images_users.length; ++i) {
					var users = images_users[i].users;

					for (var u = 0; u < users.length; ++u) {
						var id = parseInt(users[u], 10);

						if (!this.users.has(id)) {
							this.users.set(id, {

								img: images_users[i].image_url,
								title: images_users[i].title,
								replace: !!parseInt(images_users[i].replace_name, 10)

							});
						}
					}
				}

				var images_groups = this.settings["images_groups"];

				for (var _i = 0; _i < images_groups.length; ++_i) {
					var groups = images_groups[_i].groups;

					for (var g = 0; g < groups.length; ++g) {
						var _id = parseInt(groups[g], 10);

						if (!this.groups.has(_id)) {
							this.groups.set(_id, {

								img: images_groups[_i].image_url,
								title: images_groups[_i].title,
								replace: !!parseInt(images_groups[_i].replace_name, 10)

							});
						}
					}
				}
			}
		}
	}, {
		key: "add_icon",
		value: function add_icon() {
			var _this = this;

			var $user_links = $("a.user-link:not([data-icon-check])");

			$user_links.each(function (index, elem) {
				_this.add_user_icon(elem);
				_this.add_group_icon(elem);
			});
		}
	}, {
		key: "add_user_icon",
		value: function add_user_icon(elem) {
			var $link = $(elem);
			var user_id = parseInt($link.attr("data-id"), 10);

			if (this.users.has(user_id)) {
				var entry = this.users.get(user_id);

				var $img = $("<img />").attr({

					src: entry.img,
					title: entry.title,
					alt: entry.title

				});

				entry.replace ? $link.empty().append($img) : $link.prepend($img);

				$link.attr("data-icon-check");
				$link.addClass("plugin-icon-next-to-name");
			}
		}
	}, {
		key: "add_group_icon",
		value: function add_group_icon(elem) {
			var $link = $(elem);
			var matches = $link.attr("class").match(/group-(\d+)/i);

			if (matches && matches.length == 2) {
				var group_id = parseInt(matches[1], 10);

				if (group_id && this.groups.has(group_id)) {
					var entry = this.groups.get(group_id);

					var $img = $("<img />").attr({

						src: entry.img,
						title: entry.title,
						alt: entry.title

					});

					entry.replace ? $link.empty().append($img) : $link.prepend($img);

					$link.attr("data-icon-check");
					$link.addClass("plugin-icon-next-to-name");
				}
			}
		}
	}]);

	return Icon_Next_To_Name;
}();


Icon_Next_To_Name.init();