/* eslint-disable */
export default {
  pages: {
    key: "title",
    data: [
      {title: 'Home',   url: '/',      icon: 'HomeIcon', is_bookmarked: false},
      {title: 'Page 2', url: '/page2', icon: 'FileIcon', is_bookmarked: false},

      // apps
      {title: "Todo",                       url: "/apps/todo",                          icon: "CheckSquareIcon",    is_bookmarked: true},
      {title: "Chat",                       url: "/apps/chat",                          icon: "MessageSquareIcon",  is_bookmarked: true},
      {title: "Email",                      url: "/apps/email",                         icon: "MailIcon",           is_bookmarked: true},
      {title: "Calendar",                   url: "/apps/calendar/vue-simple-calendar",  icon: "CalendarIcon",       is_bookmarked: true},
    ]
  }
}
/* eslint-enable */
