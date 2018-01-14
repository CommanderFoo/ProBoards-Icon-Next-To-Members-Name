class Icon_Next_To_Name {

	static init(){
		this.PLUGIN_ID = "pixeldepth_icon_to_name";
		this.settings = {};
		this.users = new Map();
		this.groups = new Map();

		this.setup();

		if(this.users.size == 0 && this.groups.size == 0){
			return;
		}

		$(this.ready.bind(this));
	}

	static ready(){
		this.add_icon();

		proboards.on("afterSearch", this.add_icon.bind(this));
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			this.settings = plugin.settings;

			let images_users = this.settings["images_users"];

			for(let i = 0; i < images_users.length; ++ i){
				let users = images_users[i].users;

				for(let u = 0; u < users.length; ++ u){
					let id = parseInt(users[u], 10);

					if(!this.users.has(id)){
						this.users.set(id, {

							img: images_users[i].image_url,
							title: images_users[i].title,
							replace: !!parseInt(images_users[i].replace_name, 10),

						});
					}
				}
			}

			let images_groups = this.settings["images_groups"];

			for(let i = 0; i < images_groups.length; ++ i){
				let groups = images_groups[i].groups;

				for(let g = 0; g < groups.length; ++ g){
					let id = parseInt(groups[g], 10);

					if(!this.groups.has(id)){
						this.groups.set(id, {

							img: images_groups[i].image_url,
							title: images_groups[i].title,
							replace: !!parseInt(images_groups[i].replace_name, 10),

						});
					}
				}
			}
		}
	}

	static add_icon(){
		let $user_links = $("a.user-link:not([data-icon-check])");

		$user_links.each((index, elem) => {
			this.add_user_icon(elem);
			this.add_group_icon(elem);
		});
	}

	static add_user_icon(elem){
		let $link = $(elem);
		let user_id = parseInt($link.attr("data-id"), 10);

		if(this.users.has(user_id)){
			let entry = this.users.get(user_id);

			let $img = $("<img />").attr({

				src: entry.img,
				title: entry.title,
				alt: entry.title

			});

			(entry.replace)? $link.empty().append($img) : $link.prepend($img);

			$link.attr("data-icon-check");
			$link.addClass("plugin-icon-next-to-name");
		}
	}

	static add_group_icon(elem){
		let $link = $(elem);
		let matches = $link.attr("class").match(/group-(\d+)/i);

		if(matches && matches.length == 2){
			let group_id = parseInt(matches[1], 10);

			if(group_id && this.groups.has(group_id)){
				let entry = this.groups.get(group_id);

				let $img = $("<img />").attr({

					src: entry.img,
					title: entry.title,
					alt: entry.title

				});

				(entry.replace)? $link.empty().append($img) : $link.prepend($img);

				$link.attr("data-icon-check");
				$link.addClass("plugin-icon-next-to-name");
			}
		}
	}

}

Icon_Next_To_Name.init();