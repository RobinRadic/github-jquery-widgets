/** @fileoverview githubEvents - A jQuery plugin that shows recent repository events
 *
 * jQuery Github Events Widget is a plugin that shows recent repository events
 * Highly customizable options. Multiple ways to build and include into your project.
 *
 *
 * @author Robin Radic
 * @copyright Robin Radic 2014
 * @license MIT License
 * @link https://github.com/robinradic/jquery-github-widgets
 * @link http://radic.mit-license.org
 * @version 0.0.1
 * @summary A jQuery plugin that shows recent repository events
 */
(function (factory) {
    factory(jQuery, radic);
}(function ($, R) {
    var texts = {
        _compile: function (template, data, options) {
            options = options || {};
            return $(Handlebars.templates['github.events.' + template](data)).html();
        },
        issue: function (issue, options) {
            options = options || {};
            return this._compile('actor', $.extend({actor: actor}, options));
        },
        tag: function (payload, options) {
            options = options || {};
            return this._compile('tag', $.extend({tag: payload.ref, description: payload.description, decorator: this}, options));
        },
        user: function (user, options) {
            options = options || {};
            return this._compile('user', $.extend(user, options));
        },

        repo: function (repo, options) {
            options = options || {};
            return this._compile('repo', $.extend({repo: repo}, options));
        },
        commits: function (event, options) {
            options = options || {};
            return this._compile('commits', $.extend({event: event}, options));
        },
        branch: function (event, options) {
            options = options || {};
            return this._compile('branch', $.extend({event: event}, options));
        }
    };
    /**
     * @namespace radic
     * @namespace radic.githubEvents
     */
    $.widget('radic.githubEvents', $.github.widget, /** @lends radic.githubEvents */ {
        version: '0.0.1',


        /**
         * Default options
         * @property {Object}  options - the default options
         * @property {String}  options.username - the user login name or id
         * @property {String}  [options.template=github.events] - The template (file) name
         * @property {string} [options.className=gh-events-widget] - The class name that will be applied to the highest html node of the template
         * @property {number} [options.max=60] - The maximum number of events shown
         * @property {number} [options.height=300] - The height you want the widget to be
         * @property {object} options.output.events - The default output events. Use this if you want to overide the text, icon etc inside an event
         * @property {object} options.output.events.default - The default event data. Each event will inherit the defaults and overrides it with it's own properties
         * @property {object} [options.output.events.default.icon=fa fa-info] - The icon class
         * @property {object} [options.output.events.default.text=A github event has been triggered] - The text to display
         * @property {object} [options.output.events.default.iconColor=default] - The icon background color
         * @property {object} [options.output.events.CommitCommentEvent]
         * @property {object} [options.output.events.CreateEvent]
         * @property {object} [options.output.events.DeleteEvent]
         * @property {object} [options.output.events.DeploymentEvent]
         * @property {object} [options.output.events.DeploymentStatusEvent]
         * @property {object} [options.output.events.DownloadEvent]
         * @property {object} [options.output.events.FollowEvent]
         * @property {object} [options.output.events.ForkEvent]
         * @property {object} [options.output.events.ForkApplyEvent]
         * @property {object} [options.output.events.GistEvent]
         * @property {object} [options.output.events.GollumEvent]
         * @example
         *  $('#thewidget').githubEvents({
         *      username: 'usah',
         *      output: {
         *          events: {
         *              IssueCommentEvent: {
         *                  icon: 'fa fa-edit',
         *                  iconColor: 'default',
         *                  text: 'The new issues event text'
         *              },
         *              IssueEvent: {
         *                  text: function(event){
         *                      console.log(event);
         *                      return '<a hreft="#" class="btn btn-xs btn-default">' + event.author.name + '</a>';
         *                  }
         *              }
         *          }
         *      }
         *  });
         */
        options: {
            username: '',
            template: 'github.events',
            className: 'gh-events-widget',
            max: 60,
            height: 300,
            output: {
                events: {
                    default: {
                        icon: 'fa fa-info',
                        text: 'A github event has been triggered',
                        iconColor: 'default',
                        link: false
                    },
                    CommitCommentEvent: {
                        icon: 'fa fa-edit',
                        text: 'New comment on a commit'
                    },
                    CreateEvent: {
                        icon: 'fa fa-plus',
                        iconColor: 'warning',
                        text: function (event) {
                            var str = '';

                            if (event.payload.ref_type === 'tag') {
                                this.icon = 'fa fa-tag';
                                this.iconColor = 'green';
                                str += texts.tag(event.payload);
                                str += " tagged by ";
                            }

                            str += '<div class="btn-group">';
                            str += texts.user(event.actor, {icon: true, class: 'btn btn-xs btn-orange'});
                            str += texts.repo(event.repo, {class: 'btn btn-xs btn-primary'});
                            str += '</div>';
                            //console.log('create event text', str);
                            // str += event.repo.;
                            //console.warn(this);
                            return str.replace("\n", "");

                        }
                    },
                    DeleteEvent: {
                        icon: 'fa fa-trash',
                        iconColor: 'default',
                        text: 'A branch or tag has been deleted'
                    },
                    DeploymentEvent: {
                        icon: 'fa fa-',
                        iconColor: 'default',
                        text: ''
                    },
                    DeploymentStatusEvent: {
                        icon: 'fa fa-',
                        iconColor: 'default',
                        text: ''
                    },
                    DownloadEvent: {
                        icon: 'fa fa-cloud-download',
                        iconColor: 'default',
                        text: 'A new download has been created'
                    },
                    FollowEvent: {
                        icon: 'fa fa-bullhorn',
                        iconColor: 'default',
                        text: 'A user started following me'
                    },
                    ForkEvent: {
                        icon: 'fa fa-code-fork',
                        iconColor: 'default',
                        text: 'A repository was forked'
                    },
                    ForkApplyEvent: {
                        icon: 'fa fa-code-fork',
                        iconColor: 'default',
                        text: ''
                    },
                    GistEvent: {
                        icon: 'fa fa-git',
                        iconColor: 'default',
                        text: 'A gist has been created or updated'
                    },
                    GollumEvent: {
                        icon: 'fa fa-git',
                        iconColor: 'default',
                        text: 'A wiki page has been created or updated'
                    },
                    IssueCommentEvent: {
                        icon: 'fa fa-comment-o',
                        iconColor: 'info',
                        text: 'An issue received a new comment'
                    },
                    IssuesEvent: {
                        icon: 'fa fa-exclamation-triangle',
                        iconColor: 'warning',
                        text: function (event) {
                            /*
                             var action = event.payload.action;
                             action = action === 'started' ? 'starred' : action;
                             return texts.actor(event.actor) + ' ' + action + ' ' + texts.issue(event.payload.issue);
                             */
                            return 'IssuesEvent has occured';
                        }
                    },
                    MemberEvent: {
                        icon: 'fa fa-sitemap',
                        iconColor: 'default',
                        text: 'A user is added as collaborator to a repository'
                    },
                    PageBuildEvent: {
                        icon: 'fa fa-file-o',
                        iconColor: 'default',
                        text: ''
                    },
                    PublicEvent: {
                        icon: 'fa fa-users',
                        iconColor: 'default',
                        text: ''
                    },
                    PullRequestEvent: {
                        icon: 'fa fa-sort-desc',
                        iconColor: 'default',
                        text: ''
                    },
                    PullRequestReviewCommentEvent: {
                        icon: 'fa fa-random',
                        iconColor: 'default',
                        text: ''
                    },
                    PushEvent: {
                        icon: 'fa fa-save',
                        text: function (event) {

                            return $(document.createElement('span'))
                                .append(texts.user(event.actor, {icon: true}))
                                .append(
                                $(document.createElement('div')).addClass('btn-group')

                                    .append(texts.branch(event))
                                    .append(texts.commits(event))
                            )
                                .append(' to ')
                                .append(texts.repo(event.repo))
                                .html();

                            // return 'PushEvent has occured';
                        },
                        iconColor: 'success'
                    },
                    ReleaseEvent: {
                        icon: 'fa fa-chain-broken',
                        text: 'A new release has been published',
                        iconColor: 'default'
                    },
                    StatusEvent: {
                        icon: 'fa fa-info',
                        text: 'The status of a Git commit has changed',
                        iconColor: 'default'
                    },
                    TeamAddEvent: {
                        icon: 'fa fa-plus',
                        text: 'A user has been added to the team',
                        iconColor: 'default'
                    },
                    WatchEvent: {
                        icon: 'fa fa-star',
                        text: function (event) {
                            /*
                             var action = event.payload.action;
                             action = action === 'started' ? 'starred' : action;
                             return texts.actor(event.actor) + ' ' + action + ' ' + texts.repo(event.repo);
                             */
                            return 'WatchEvent has occured';
                        },
                        iconColor: 'warning'
                    }
                }
            }
        },

        _data: {
            eventData: {},
            eventTypes: {}
        },

        /**
         * Repaints the widget. Usefull in case of option changes
         * @example
         * $('#thewidget').githubEvents('repaint');
         */
        repaint: function () {
            var self = this;
            self._trigger('repaint');
            var $template = self._compile(self.options.template, self.data);
            self.element.html($template);
            self._trigger('repainted');
        },

        /**
         * Refreshes the data and repaints the widget. Usefull in case of option changes
         * @example
         * $('#thewidget').githubEvents('refresh');
         */
        refresh: function () {
            var self = this;
            self._trigger('refresh');
            self.element.html('');
            self._spin();
            self._fetchEventData(function (data) {
                self._spin(false);
                self.data = $.extend({options: self.options}, data);
                self.repaint();
                self._trigger('refreshed');
            });
        },

        _create: function () {
            var self = this;

            self._data = {
                eventData: {},
                eventTypes: {}
            };

            this.$widget = null;

            // Create a seperate copy of all event triggers and merge the defaults
            $.each(this.options.output.events, function (type, event) {
                if (type === 'default') return;
                self._data.eventTypes[type] = $.extend(R.cloneDeep(self.options.output.events.default), event);
            });

            this.refresh();
        },

        /**
         * Get a specific event. Every event row has a data attribute (data-github-event) containing the relative event id.
         * You can use this to fetch the event information
         * @param {number} eventID - The id of the event you want to get
         * @returns {object} event - The event JSON data.
         * @example
         * $('#thewidget').githubEvents('getEvent', 123123);
         * // returns something likewise. use console.log to see the exact data returned.
         * {
         *      icon: "fa fa-save",
         *      iconColor: "success",
         *      id: "2487066506",
         *      link: false,
         *      raw: "RAW EVENT JSON DATA",
         *      time: "2014-12-30T07:51:34Z",
         *      timeAgo: "8 hours ago",
         * }
         */
        getEvent: function (eventID) {
            return this._data.eventData[eventID];
        },

        _fetchEventData: function (callback) {
            var self = this;
            R.github.users.events(this.options.username, 0, this.options.max, function (events) {

                var eventData = [];
                for (var i = 0; i < events.length; i++) {
                    var event = self._getProcessedEvent(events[i]);
                    eventData.push(event);
                    self._data.eventData[event.id] = event;
                }

                callback({events: eventData});
            });
        },

        _getProcessedEvent: function (eventData) {
            var self = this;
            var event = R.cloneDeep(self._data.eventTypes[eventData.type]);
            if (R.isFunction(event.text)) {
                event.text = event.text.apply(event, [eventData]);
            }
            event.id = eventData.id;
            event.raw = eventData;
            event.timeAgo = R.time.ago(eventData.created_at);
            event.time = eventData.created_at;
            return event;
        },


        _destroy: function () {
            this.element.html('');
        }


    });

}));
