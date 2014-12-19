/**
 * Copyright 2014 Robin Radic - All rights reserved.
 */
(function (factory) {
    factory(jQuery, radic);
}(function ($, R) {

    $.widget('radic.githubEvents', $.radic.base, {
        version: '0.0.1',
        options: {
            username: '',

            template: 'github.profile',
            className: 'gh-profile-widget',

            spinner: true,
            spinnerOptions: {},


            useSpinner: true,
            max: 60,


            output: {
                template: {
                    title: 'Recent events',
                    height: 300
                },
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
                        iconColor: 'success',
                        text: function (event) {
                            /*
                            var str = radic.github.theme.actor(event.actor);
                            if (event.payload.ref_type === 'tag') str += radic.github.theme.tag(event.payload);

                            str += radic.github.theme.repo(event.repo);
                            return str.replace("\n", "");
                            */ return '';
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
                            return radic.github.theme.actor(event.actor) + ' ' + action + ' ' + radic.github.theme.issue(event.payload.issue);
                              */ return '';
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
                            /*
                            return $(document.createElement('span'))
                                .append(radic.github.theme.actor(event.actor))
                                .append(radic.github.theme.branch(event))
                                .append(radic.github.theme.commits(event))
                                .append(' to ')
                                .append(radic.github.theme.repo(event.repo)).html();
                            */ return '';
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
                            return radic.github.theme.actor(event.actor) + ' ' + action + ' ' + radic.github.theme.repo(event.repo);
                              */ return '';
                        },
                        iconColor: 'warning'
                    }
                }
            }
        },

        _create: function () {
            var self = this;
            self.__cache = {
                users: {},
                repos: {},
                events: {}
            };

            this.$widget = null;
            if (this.options.useSpinner === true) {
                this.element.spin();
            }

            // Create a seperate copy of all event triggers and merge the defaults
            self.__events = {};
            $.each(this.options.output.events, function (type, event) {
                if (type === 'default') return;
                self.__events[type] = _.merge(_.cloneDeep(self.options.output.events.default), event);
            });

            self._fetchEventData(function (data) {
                if (self.options.useSpinner === true) {
                    self.element.spin(false);
                }

                var templateHTML = $(self.options.selectors.template).html();
                var template = jQuery.template(templateHTML);
                $.extend(data, self.options.output.template);
                var $widget = template(data);
                self.element.append($widget);
                self._bindAll();
            });
        },

        _bindAll: function () {
            var self = this;
            var sel = this.options.selectors;

            this.element.find('*[data-github-user]').popover({
                html: true,
                trigger: 'manual',
                container: 'body',
                placement: 'left',
                content: function () {
                    return self._popoverUser($(this).data('github-user'));
                }
            }).hover(function (e) {
                e.preventDefault();
                $(this).popover('toggle');
            });

            this.element.find('*[data-github-commits]').each(function () {
                var c = $(this).data('github-commits');
                $(this).popover({
                    html: true,
                    trigger: 'manual',
                    container: 'body',
                    placement: 'right',
                    content: function () {

                        return self._getTemplate('github-events-commits', {event: self.__cache.events[c]['raw']});
                    }
                }).hover(function (e) {
                    e.preventDefault();
                    $(this).popover('toggle');
                });
            });
            this.element.find('*[data-github-issue]').tooltip({container: 'body'});
        },

        _fetchEventData: function (callback) {
            var self = this;
            radic.github.users.events(this.options.username, 0, this.options.max, function (events) {
                var eventData = [];
                for (var i = 0; i < events.length; i++) {
                    var event = self._getProcessedEvent(events[i]);
                    eventData.push(event);
                    self.__cache.events[events[i].id] = event;
                }
                callback({
                    events: eventData
                });
            });
        },

        _getProcessedEvent: function (eventData) {
            var self = this;
            var event = _.cloneDeep(self.__events[eventData.type]);
            if (_.isFunction(event.text)) {
                event.text = event.text.apply(this, [eventData]);
            }
            event.id = eventData.id;
            event.raw = eventData;
            event.timeAgo = moment(eventData.created_at).fromNow(true);
            return event;
        },

        _popoverUser: function (username) {
            var self = this;
            if (_.isUndefined(self.__cache.users[username])) {
                self.__cache.users[username] = JSON.parse(radic.github.syncRequest('/users/' + username));
            }
            var user = self.__cache.users[username];
            return self._getTemplate('github-events-user-popover', {user: user});
        },

        _getTemplate: function (templateId, data) {
            var templateHTML = $('script[data-template-id="' + templateId + '"]').html();
            var template = jQuery.template(templateHTML);

            var defaults = {
                isset: function (val) {
                    if (_.isUndefined(val)) {
                        return false;
                    }
                    if (_.isString(val)) {
                        return val.length > 0
                    }
                    return true;
                }
            };
            return template($.extend(defaults, data));
        },


        _createModal: function () {

        },

        _showModal: function (modalType, event) {
            switch (modalType) {
                case "user":

                    break;

                case "repository":

                    break;

                case "push":
                    radic.github.repos.commitsSha('RobinRadic', 'swiftapi', '4853e862828bc697e2db839d7ad91fafb0844c1c', function (result) {

                    });
                    break;
            }
        },


        /* The _init method is called after _create when the widget is first applied to its elements.
         The _init method is also called every time thereafter when the widget is invoked with no arguments or with options.
         This method is the recommended place for setting up more complex initialization and is a good way to support reset functionality for the widget if this is required.
         It's common for widgets to not implement an _init method. */
        _init: function (callback) {


        },


        _getCreateEventData: function () {

        },

        _destroy: function () {
            this.element.html('');
        },


        _setOptions: function (options) {
            // Ensure "value" option is set after other values (like max)
            var value = options.value;
            delete options.value;

            this._super(options);

            this.options.value = this._constrainedValue(value);
            this._refreshValue();
        },

        _setOption: function (key, value) {
            if (key === "max") {
                // Don't allow a max less than min
                value = Math.max(this.min, value);
            }
            if (key === "disabled") {
                this.element
                    .toggleClass("ui-state-disabled", !!value)
                    .attr("aria-disabled", value);
            }
            this._super(key, value);
        },


    });

}));
