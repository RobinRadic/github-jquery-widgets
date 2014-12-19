/*
Github Profile jquery widget
http://robinradic.github.io/github-profile-widget

Copyright © 2014 Robin Radic - MIT License (http://radic.mit-license.org)

Copyright © 2014 Piotr Lewandowski
Original idea from https://github.com/piotrl/github-profile-widget
Complete javascript rewrite
Uses most of the original CSS
*/
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['widget.github.profile'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <div class=\"profile\">\n                <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.avatar_url : stack1), depth0))
    + "\" class=\"avatar\">\n                <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.html_url : stack1), depth0))
    + "\" class=\"name\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n\n                <div class=\"followMe\">\n                    <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.html_url : stack1), depth0))
    + "\" class=\"follow-button\">Follow @"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.login : stack1), depth0))
    + "</a>\n                    <span class=\"followers\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.followers : stack1), depth0))
    + "</span>\n                </div>\n            </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"languages\">\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.languagesHeaderText : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                <table class=\"languages-list\">\n                    <thead>\n                    <tr>\n                        <th>Language</th>\n                        <th>Lines of code</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.topLanguages : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </tbody>\n                </table>\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<span class=\"header\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.languagesHeaderText : stack1), depth0))
    + "</span>";
},"6":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <tr>\n                            <td>"
    + escapeExpression(((helpers.arrayIndex || (depth0 && depth0.arrayIndex) || helperMissing).call(depth0, depth0, 0, {"name":"arrayIndex","hash":{},"data":data})))
    + "</td>\n                            <td>\n                                <small>"
    + escapeExpression(((helpers.arrayIndex || (depth0 && depth0.arrayIndex) || helperMissing).call(depth0, depth0, 1, {"name":"arrayIndex","hash":{},"data":data})))
    + "</small>\n                            </td>\n                        </tr>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"repos\">\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.repositoriesHeaderText : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.topRepos : depth0), {"name":"each","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<span class=\"header\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.repositoriesHeaderText : stack1), depth0))
    + "</span>";
},"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.html_url || (depth0 != null ? depth0.html_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html_url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "\">\n                        <span class=\"repo-name\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"updated\">Updated: "
    + escapeExpression(((helper = (helper = helpers.updated_at_formatted || (depth0 != null ? depth0.updated_at_formatted : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"updated_at_formatted","hash":{},"data":data}) : helper)))
    + "</span><span class=\"star\">"
    + escapeExpression(((helper = (helper = helpers.stargazers_count || (depth0 != null ? depth0.stargazers_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"stargazers_count","hash":{},"data":data}) : helper)))
    + "</span>\n                    </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<script type=\"text/x-handlebars-template\">\n    <div data-username=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.login : stack1), depth0))
    + "\" class=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.className : stack1), depth0))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showProfile : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showLanguages : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showRepositories : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</script>\n";
},"useData":true});
})();
;
(function (factory) {

        factory(jQuery, radic);

}(function ($, R) {

    R.template.registerHelper('arrayIndex', function (context, ndx) {
        return context[ndx];
    });

    $.widget('radic.githubProfile', $.radic.base, {
        version: '0.0.1',

        options: {
            username: null,

            showProfile: true,
            showFollow: true,
            showLanguages: true,
            showRepositories: true,

            template: 'widget.github.profile',
            className: 'gh-profile-widget',

            spinner: true,
            spinnerOptions: {},

            sortBy: 'stars', // possible: 'stars', 'updateTime'
            repositoriesHeaderText: 'Most starred repositories',
            repositoriesDateFormat: 'lll',
            repositoriesLimit: 5,

            languagesHeaderText: 'Top languages',
            languagesLimit: 7
        },

        _spin: function(disable){
            if(this.options.spinner === true){
                if(typeof disable === 'boolean' && disable === false){
                    return this.element.spin(false);
                }
                this.element.spin(this.options.spinnerOptions);
            }
        },

        refresh: function(){
            var self = this;
            self._spin();

            self._getData(function (data) {
                self._spin(false);
                var $template = self._compile(self.options.template, data);
                self.element.html($template);
                self._trigger('completed', null);
            });
        },

        _create: function () {
            if(this.options.username === null || ! _.isString(this.options.username)){
                console.error('githubProfile widget has been initialized without the required username option');
                return;
            }
            this.refresh();
        },

        _sortLanguages: function (languages) {
            this._trigger('beforeSortLanguages', null, languages);
            var topLangs = [];
            for (var k in languages) {
                topLangs.push([k, languages[k]]);
            }

            topLangs.sort(function (a, b) {
                return b[1] - a[1];
            });
            this._trigger('afterSortLanguages', null, topLangs);
            return topLangs.slice(0, this.options.languagesLimit);
        },

        _sortRepositories: function (reposData) {
            this._trigger('beforeSortRepositories', null, reposData);
            var self = this;
            reposData.sort(function (a, b) {
                // sorted by last commit
                if (self.options.sortBy == 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
            });
            this._trigger('afterSortRepositories', null, reposData);
            return reposData.slice(0, self.options.repositoriesLimit);
        },

        _getData: function (callback) {
            var self = this;
            var username = this.options.username;
            radic.async.waterfall([
                function (done) {
                    //sradic.github.setTransport('')
                    var u = radic.github.users(username, function (userData, second) {
                        self._trigger('onReceivedUser', null, userData);
                        console.info('even more data', userData, radic.defined(second) ? second : 'no second');

                        done(null, userData);
                    });
                    console.log('u2', u);
                },
                function (userData, done) {

                    radic.github.users.repos(username, null, 1, 100, function (repoData) {
                        self._trigger('onReceivedRepositories', null, repoData);
                        done(null, {user: userData, repos: repoData});
                    })
                },
                function (apiData, done) {
                    apiData.languages = {};

                    radic.async.each(apiData.repos, function(repo, next){

                        repo.updated_at_formatted = moment(repo.updated_at).format(self.options.repositoriesDateFormat);
                        var doLang = function(langData){
                            $.each(langData, function(i, lang){
                                if(typeof apiData.languages[i] === 'undefined'){
                                    apiData.languages[i] = lang;
                                } else {
                                    apiData.languages[i] += lang;
                                }
                            });
                        };

                        var cached = radic.storage.get('github-profile-widget-languages', {json: true});
                        if(cached) {
                            apiData.languages = cached.languages;
                            next();
                        } else {
                            radic.github.repos.languages(username, repo.name, function (langData) {
                                doLang(langData);
                                radic.storage.set('github-profile-widget-languages', {languages: apiData.languages}, {expires: 60, json: true});
                                next();
                            });
                        }
                    }, function(){

                        done(null, apiData)
                    })
                },
                function (data, done) {
                    data.topRepos = self._sortRepositories(data.repos);
                    done(null, data)
                },
                function (data, done) {
                    data.topLanguages = self._sortLanguages(data.languages);
                    callback(data);
                    done(null);

                }
            ])
        },

        _destroy: function () {
            this.element.html('');
            self._trigger('destroyed', null);
        },

        _setOption: function (key, value) {
            if (key === "disabled") {
                this.element
                    .toggleClass("ui-state-disabled", !!value)
                    .attr("aria-disabled", value);
            }
            this._super(key, value);
        }
    });

}));
