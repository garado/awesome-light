---
title: Hybrid Mode
slug: hybrid-mode
---

> [!NOTE]
> **Update:** the [Light SDK](https://github.com/lightphone/light-sdk) is now available. This enables the option for user-installed applications outside of LightOS to populate in LightOS instead of needing a separate launcher and a way to swap in-between the Android layer and LightOS. For those that wish to do so, please follow the guide in the [SDK section](../sdk/).

Hybrid Mode is a use case for those who wish to use LightOS but require some additional applications for them to make a complete switch to the phone. There are some key differences between Hybrid Mode and Full Android, most notably with battery consumption and battery life, as well as use cases.

LightOS will always be running unrestricted in Hybrid Mode. This allows you to switch between the Android layer and LightOS seamlessly but, having multiple applications open at once and running in the background will drain your battery fairly quickly. Having Battery Saver on helped some, but it won't do much in the case of Hybrid Mode users. You do have the option of restricting and/or optimising some of your Android layer applications to help conserve battery life, but the downside is that you may miss key notifications from i.e. messaging applications. Your battery life won't be good, and unfortunately, there isn't much that can be done about it.

Another thing to note, `light_mode` will always be enabled whenever you access LightOS. `light_mode` is simply **one of** the global settings that hides some of the missing UI elements i.e. call UI, notification UI, status bar and button navigation. You can opt to enable it via adb or Shizuku/aShell but whenever you open LightOS again, it will disable it.

If you want to have full access to Wi-Fi / Bluetooth connections, you MUST enable `light_mode` in order to connect Bluetooth and Wi-Fi on Hybrid Mode. Click **[HERE](../full-android/#global-setting-light_mode)** to enable `light_mode`.

To run Hybrid Mode successfully, you may want to opt to keep your Android layer presence to a minimum to conserve battery life and you'll need some Hybrid Mode specific additions to help usability.

For Hybrid Mode, you will want to follow the guide in this order:

1. [How to Access the Android Layer](../how-to-access-the-android-layer/)
2. [Developer Options](../developer-options/) (Android and / or LightOS)
3. [Setting Up Android](../setting-up-android/)
4. [Key Mapper](../key-maps-and-macros/#key-mapper)

Everything else in this guide is meant for you to tailor to your own use, and trying out launchers, applications, keyboards, etc. is encouraged to all users. I can give some recommendations, but there is so many apps, key maps and macros that can all be customised to your own preferences.

You can jump to some of the other Hybrid Mode specific sections of this guide:

- [Applications](../applications/)
- [Launchers](../applications/#launchers)
- [Additional Applications](../applications/#additional-applications)
- [Key Mapper](../key-maps-and-macros/#key-mapper)
- [Recreating LightOS Key Maps](../key-maps-and-macros/#recreating-lightos-button-functionality)
- [Hybrid Mode Specific Key Maps](../key-maps-and-macros/#hybrid-mode-specific-key-maps)
- [MacroDroid](../key-maps-and-macros/#macrodroid)
- [Hybrid Mode Specific Macros](../key-maps-and-macros/#hybrid-mode-specific-macros)
- [Call Handling](../key-maps-and-macros/#call-handling)
- [Notification Handling](../key-maps-and-macros/#notification-handling)
- [Battery Optimisation](../additional-guides/#battery-optimisation)
