const config = {
  'react-native': {
    analytics_auto_collection_enabled: true,
    google_analytics_automatic_screen_reporting_enabled: true,
    messaging_auto_init_enabled: true,
    messaging_ios_auto_register_for_remote_messages: true,

    crashlytics_debug_enabled: false, // Set to false in production
    crashlytics_ndk_enabled: false, // Set to false in production
    crashlytics_disable_auto_disabler: false, // Set to false in production
    crashlytics_auto_collection_enabled: true,
    crashlytics_is_error_generation_on_js_crash_enabled: false, // Set to false in production
    crashlytics_javascript_exception_handler_chaining_enabled: false, // Set to false in production
  },
};
