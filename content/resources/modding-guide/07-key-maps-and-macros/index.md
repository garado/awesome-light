---
title: Key maps and macros
slug: key-maps-and-macros
---

In Android, we initially lose the functionality of the hardware buttons and some of the general UI. In order to restore them, we'll need to employ the use of Key Mapper and MacroDroid. While I don't currently have a use for MacroDroid, I did end up using it heavily while test driving Hybrid mode. You'll need macros in order to use Hybrid Mode effectively but in Full Android, it isn't necessary unless you want it. Now, while running Full Android, I primarily use Key Mapper, especially for the fun key maps I've made.

# Key Mapper

This application is crucial in helping to restore button functionality while in Android. If you haven't noticed, we can no longer use the buttons as they once were in LightOS.

## Installation

1. Install Key Mapper (via Aurora or F-Droid).

    ![The Key Mapper store page with the 'Open' button.](./assets/p047-1.png)

2. Open Key Mapper.
3. You'll have the following warnings at the top of the screen:

    ![Key Mapper showing '2 warnings' at the top of the screen.](./assets/p047-2.png)

4. Enable accessibility services:
    a. Select 'Fix'.

    ![The accessibility service warning with 'Fix' highlighted.](./assets/p048-1.png)

    b. Select 'Enable'.

    ![The 'Accessibility service must be enabled' dialog with 'Enable' highlighted.](./assets/p048-2.png)

    c. Make sure Key Mapper is 'ON' in Accessibility Settings.

    ![The Accessibility settings list with 'Key Mapper' set to On.](./assets/p049-1.png)

    ![The Key Mapper accessibility screen with 'Use Key Mapper' enabled.](./assets/p049-2.png)

    d. Go back to Key Mapper.
5. Turn on notifications:
    a. Select 'Fix'.

    ![The notifications warning with 'Fix' highlighted.](./assets/p050-1.png)

    b. Select 'Turn on'.

    ![The 'Turn on notifications' dialog with 'Turn on' highlighted.](./assets/p050-2.png)

    c. Select 'Allow'.

    ![The 'Allow Key Mapper to send you notifications?' dialog with 'ALLOW' highlighted.](./assets/p051-1.png)

    d. Go back to Key Mapper.
6. Verify Key Mapper is running.

    ![Key Mapper showing a green 'Running' indicator at the top.](./assets/p051-2.png)

## Creating key maps

There's an abundance of ways you can map your keys, especially since the Light Phone III comes with additional hardware. You have free will and customisation for this, so feel free to try out and modify different key maps to see which ones fit your use case the best. I'll also include the key maps to replicate LightOS's buttons, and I'll detail the key maps I currently run as well.

In order to make a key map, you'll have to record a trigger, select the action you want, constraints and additional options. Note, some of the actions require root and/or Shizuku so we won't be able to use them quite yet.

You can also organise your key maps via groups and sub-groups depending on how many key maps you have.

In this section, I'll show you how to make a new key map, and while this will be for the flashlight button, it is applicable to any key maps you make. In LightOS, you use the scroll wheel button as a long press in order to activate the flashlight. When we access Android, we lose that functionality.

> [!NOTE]
> Make sure your display and font size are at the smallest possible, otherwise you will not be able to record triggers for key maps. If you skipped this step, click **HERE** to jump to the section explaining how to do so.

**Creating key maps, re-creating LightOS flashlight button (example):**

1. Create a new key map. You can find the '+' button to add a new key map at the bottom of the screen.

    ![The Key Mapper 'Key maps' tab with the '+' button highlighted.](./assets/p052.png)

2. Select 'Record trigger'.

    ![The 'Trigger' tab with 'Record trigger' highlighted.](./assets/p053-1.png)

3. Press the button you wish to map.
    a. In this case, the original flashlight button (centre button of scroll wheel) is 'unknown keycode 319'.
4. Below the registered key trigger, select radial button 'Long press'.

    ![The recorded trigger 'unknown keycode 319' with 'Long press' selected.](./assets/p053-2.png)

5. From the top banner, select 'Actions'.
6. Select 'Add action'.

    ![The 'Actions' tab with 'Add action' highlighted.](./assets/p054-1.png)

7. Find 'Toggle flashlight'.

    ![The 'Choose an action' screen with 'Toggle flashlight' highlighted.](./assets/p054-2.png)

8. The flashlight brightness cannot be adjusted, so select 'Done'.

    ![The 'Toggle flashlight' options with 'Done' highlighted.](./assets/p055-1.png)

9. If running in Hybrid mode, you'll want to add the following constraint so your key maps don't interfere with LightOS:
    a. From the top banner, select 'Constraints'.
    b. Select 'Add constraint'.

    ![The 'Constraints' tab with 'Add constraint' highlighted.](./assets/p055-2.png)

    c. Select 'App not in foreground'

    ![The 'Choose a constraint' screen with 'App not in foreground' highlighted.](./assets/p056-1.png)

    d. Find LightOS and select it.

    ![The app list with 'LightOS' highlighted.](./assets/p056-2.png)

10. Select 'Done' in the bottom right corner to finish and save your key map.

    ![The 'Actions' tab showing 'Toggle flashlight' with 'Done' highlighted.](./assets/p057-1.png)

> [!NOTE]
> Some actions may not work unless you grant Key Mapper access to modify system settings.

1. Select 'Fix' on affected action.

    ![An action with a 'Fix' button, warning that Key Mapper needs permission to modify system settings.](./assets/p057-2.png)

2. Select 'Fix'.

    ![The 'Fix error' dialog with 'Fix' highlighted.](./assets/p058-1.png)

3. Allow Key Mapper to modify system settings.

    ![The 'Modify system settings' screen with 'Allow modifying system settings' enabled.](./assets/p058-2.png)

## Recreating LightOS button functionality

In this section, I'll give you the key maps to recreate LightOS's button functionality.

### Scroll wheel

#### Flashlight

Key map can be found **HERE**, used in the example on how to add a key map.

#### Increase display brightness

You will need to move the scroll wheel once. Delete all but one trigger (if there are multiple).

- **Trigger(s):** unknown keycode 318, short press
- **Action(s):** 'Increase display brightness', repeat until released (default settings)
- **Constraint(s):** 'LightOS is not in foreground' (Hybrid Mode only)
- **Options:** N/A

#### Decrease display brightness

You will need to move the scroll wheel once. Delete all but one trigger (if there are multiple).

- **Trigger(s):** unknown keycode 317, short press
- **Action(s):** 'Decrease display brightness', repeat until released (default settings)
- **Constraint(s):** 'LightOS is not in foreground' (Hybrid Mode only)
- **Options:** N/A

### Volume

> [!NOTE]
> Since the dialog box is part of the missing UI in Android due to `light_mode`, I highly recommend the app Volume Styles (via Aurora) if you're running Hybrid Mode and can only map the volume keys for volume. If you are running full Android, the volume buttons will work normally, with a dialog box, without a key map.

### Camera

> [!NOTE]
> Requires recording actions while creating a key map in Key Mapper.

#### Open the camera application

This is a full depress of the camera button.

- **Trigger(s):** Focus + Camera, short press at the same time
- **Action(s):** 'Open Open Camera'
- **Constraint(s):** 'LightOS is not in foreground' (Hybrid Mode only)
- **Options:** N/A

#### Focus

This is a half depress of the camera button.

- **Trigger(s):** Focus, short press
- **Action(s):** 'Tap: Lock exposure'
- **Constraint(s):** 'LightOS is not in foreground' (Hybrid Mode only)
- **Options:** N/A

#### Take picture

This is a full depress of the camera button, while the camera app is open.

- **Trigger(s):** Focus + Camera, short press at the same time
- **Action(s):** 'Tap screen (990, 547)'
    - For this, I used a screenshot of the Open Camera app to determine the coordinates for the shutter button.
    - You can also use the action 'Interact with app element: 'Take Photo''
- **Constraint(s):** 'Open Camera is in foreground'
- **Options:** N/A

![A screenshot of the Open Camera app used to find the shutter button coordinates.](./assets/p060.png)

### Home

#### Go home

This is your menu / home button.

- **Trigger(s):** Home, short press
- **Action(s):** 'Go home'
- **Constraint(s):** 'Device is unlocked'
- **Options:** N/A

## Hybrid Mode specific key maps

### Android access

For this, I recreated the original key sequence to access Android that was patched in v474, that way I could still access Android without sacrificing my key maps for other navigation.

- **Trigger(s):** Volume up → Volume up → Volume down → Volume down → Volume up → Volume down → Home, in sequence
- **Action(s):** 'Open [launcher app] in Android'
- **Constraint(s):** 'LightOS is in foreground' (Hybrid Mode only)
- **Options:** N/A

### Go back

Uses the centre scroll wheel button twice to act as your back button.

- **Trigger(s):** unknown keycode 319, double press
- **Action(s):** 'Go back'
- **Constraint(s):** 'LightOS is in foreground' (Hybrid Mode only)
- **Options:** N/A

### Recents

Uses the home / menu button twice to open your recent apps. It will interact with media playback key maps (if you are using them) so you may need to choose a different button.

- **Trigger(s):** Home, double press
- **Action(s):** 'Open recents'
- **Constraint(s):** 'LightOS is in foreground' (Hybrid Mode only)
- **Options:** N/A

## Other key maps

### Power menu

- **Trigger(s):** Home, long press
- **Action(s):** 'Show power menu'
- **Constraint(s):** 'LightOS is in foreground' (Hybrid Mode only)
- **Options:** N/A

### Media control

#### Next track

- **Trigger(s):** Volume UP, double press
- **Action(s):** 'Next track'
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

#### Previous track

- **Trigger(s):** Volume DOWN, double press
- **Action(s):** 'Previous track'
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

#### Fast forward

- **Trigger(s):** Volume UP, long press
- **Action(s):** 'Fast forward', repeat until released
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

#### Rewind

- **Trigger(s):** Volume DOWN, long press
- **Action(s):** 'Rewind', repeat until released
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

#### Play / pause media playback

- **Trigger(s):** Home, double press
- **Action(s):** 'Play / Pause media playback'
- **Constraint(s):** 'Media is playing' or 'No media is playing'
- **Options:** N/A

#### Volume up

- **Trigger(s):** unknown keycode 318
- **Action(s):** 'Volume up', repeat until released
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

#### Volume down

- **Trigger(s):** unknown keycode 317
- **Action(s):** 'Volume down', repeat until released
- **Constraint(s):** 'Media is playing'
- **Options:** N/A

### Enable / disable colour correction

For this, any button will work although I used unknown keycode 319 (centre scroll wheel button). You'll need to move colour correction to a spot on the notification shade so the key mapper can select it to enable / disable it.

This key map can also be used for other quick settings i.e. location, battery saver, data saver, night light, etc.

- **Trigger(s):** unknown keycode 319 → unknown keycode 319, in sequence OR double press
- **Action(s):** 'Expand quick settings', wait 200 ms → 'Tap screen: (797, 809)', wait 100 ms → 'Go back', wait 200 ms → 'Go back'
    - For this, I used a screenshot of the notification shade to determine the coordinates for the quick settings tile without opening the quick settings shade.
- **Constraint(s):** 'LightOS is not in foreground' (Hybrid Mode only)
- **Options:** N/A

![A screenshot of the notification shade used to find the 'Color correction' tile coordinates.](./assets/p063.png)

# MacroDroid

Another nifty tool we can use to help use of the Android layer is macros. Macros allow you to automate certain functions with or without user input. There is a bit of a learning curve to adding and creating macros, and everyone's use case is different, so there will be some trial and error depending on what you want the macros to do. It isn't a necessity for Full Android users, since we have use of the missing UI elements, and don't require switching between Android and LightOS. For Hybrid Mode users, you will have to rely on macros for certain functions.

For setting up macros, we will need MacroDroid. It has a 7-day free trial, which can be reset by uninstalling and re-installing the application. Any macros you make during this 7-day free trial will persist after the trial period is up and you can only make 5 on the free version.

There is the option to send the developer, Arlosoft, an email where you can pay via Wise. You will then receive a code that you can put into MacroDroid, granting you the pro version.

I need to make the point that I am not the best at making macros. I don't use them in Full Android but I've included a few that I used for Hybrid Mode, as well as some community suggested ones as well. My focus was on Hybrid Mode for macros, and I tried to make them as simple and usable as possible.

Also, if MacroDroid asks for any permissions, grant it access.

## Installation

1. Install MacroDroid (via Aurora).

    ![The MacroDroid store page with the 'Install' button.](./assets/p064.png)

2. Open MacroDroid.
3. Click through the initial set-up screen.
4. You will get a prompt for MacroDroid to send notifications. Select 'Allow'.

    ![The 'Allow MacroDroid to send you notifications?' dialog with 'ALLOW' highlighted.](./assets/p065-1.png)

## Introduction to MacroDroid

MacroDroid is an expansive application that deserves its own standalone guide. There are so many ways to use it but I'll give you the basic know-how to get started. How you use MacroDroid is completely up to you and your use case.

### Home screen

![The MacroDroid home screen with Add Macro, Action Blocks and Forum tiles.](./assets/p065-2.png)

Starting with the home screen of MacroDroid, we have the following options:

- Add Macro
- Action Blocks
    - Has videos for an introduction to action blocks and parameters.
- Forum
- Export / Import
- Variables
    - Has videos for variables, dictionary and array variables.
- Stopwatches
- Geofences
    - Allows macros to run within location fenced areas.
- Cell Towers
    - Uses location services to determine cell towers near the phone.
- System Log
- MacroDroid Videos
    - How-to videos on how to use MacroDroid.
- Plugins
    - Includes plugins for apps such as WhatsApp, Google applications, etc.
- Last Opened Macro
- Last Opened Action Block
- Favourite Macros
- Quick Run Macros
- User Log
- Auto Backup
- MacroDroid Drawer
- Quick Settings Tiles
- Categories
- Notification Bar Options

### Templates

There is also a tab on the bottom banner for templates of user-made macros that you can use and/or modify to your own use case.

![The MacroDroid 'Templates' tab showing community macro templates.](./assets/p066.png)

### Creating macros

When creating a macro, you have three blocks you can edit:

1. Triggers
    a. These are what trigger a macro to start.
2. Actions
    a. This is what you want the macro to do.
3. Constraints
    a. These are any filters such as when and where you want the macro to run.

![An empty macro showing the Triggers, Actions and Constraints blocks.](./assets/p067.png)

## Hybrid Mode specific macros

Hybrid Mode comes with its own challenges since there is missing UI (due to `light_mode`) and the need to switch between LightOS and Android. The biggest issues come with notifications and call handling. Since `light_mode` will re-enable every time LightOS is opened, it's not practical to continuously disable it via adb, so some workarounds will need to be made, through macros, to bridge the gap between Android and LightOS.

### Call handling

One of the biggest issues you may run into is call handling. Say you're on the Android layer and begin to receive a call. You may hear ringing, you may see your screen or flashlight notifying you, but you are unable to see who is calling, answer or even decline the call.

For call handling in Hybrid Mode, there are a few different ways you can go about this depending on your use case:

1. Dialog box on Android layer
2. Immediate jump to LightOS

When I ran Hybrid Mode, I preferred the dialog box. If I was doing something in Android, I wanted to be able to see who was calling me (despite the missing UI elements) and choose if I wanted to accept the call or not. I didn't much prefer the immediate opening of LightOS if I was in the middle of a text, for example.

#### Option 1: Dialog box

This option requires a bit of prior knowledge for if-then-else statements otherwise known as conditional statements. Simply put:

```
if x is true, then [do this]; else (where x is false) [do this]
```

We want the macro to recognise the phone is ringing, in this case, it would be 'Call Incoming' and give us an option to accept or decline the call. If we accept the call, it will boot us into LightOS and accept the call for us (so we can reduce redundant inputs) or, if we decline the call, it will reject it for us. We also want it to only appear in Android. It's a rudimentary set-up but effectively works since Hybrid Mode is missing the AOSP notifications.

So, a basic pseudocode of this would be:

```
if LightOS = not in foreground:
    if Call_Incoming = Any_Number then:
        show Dialog_Box with options (Accept, Decline)
        if Dialog_Box = confirmed then:
            Launch LightOS & Answer_Call
        else:
            Reject_Call
```

##### Trigger

1. Select 'Add Macro'.

    ![The MacroDroid home screen with 'Add Macro' highlighted.](./assets/p069-1.png)

2. In the 'Triggers' box, select the '+' to add a trigger.

    ![An empty macro with the Triggers '+' button highlighted.](./assets/p069-2.png)

3. Select 'Call / SMS'.

    ![The 'Add Trigger' list with 'Call/SMS' highlighted.](./assets/p070-1.png)

4. Select 'Call Incoming'.

    ![The 'Call/SMS' trigger list with 'Call Incoming' highlighted.](./assets/p070-2.png)

5. Select 'Allow' so that MacroDroid can access phone call logs.
6. Select 'Allow' so that MacroDroid can manage phone calls.

    ![MacroDroid permission dialogs for call logs and managing phone calls, with 'ALLOW' highlighted.](./assets/p071.png)

7. Select 'Any Number' and press 'OK'.

##### Actions

8. In the 'Actions' box, select the '+' to add an action.

    ![The macro with the 'Call Incoming' trigger, Actions '+' button highlighted.](./assets/p072-1.png)

9. Under 'Conditions / Loops', find and select 'If Confirmed Then'.

    ![The 'Add Action' screen with 'If Confirmed Then' highlighted under Conditions/Loops.](./assets/p072-2.png)

10. You will receive a prompt stating MacroDroid 'Requires Draw Overlays'. Select 'OK'.
    a. This will allow the dialog box to appear on the Android side.

    ![The 'Requires Draw Overlays' dialog with 'OK' highlighted.](./assets/p073-1.png)

11. Find MacroDroid in 'Display over other apps'.

    ![The 'Display over other apps' list with 'MacroDroid' highlighted.](./assets/p073-2.png)

12. Enable 'Allow display over other apps'.

    ![The MacroDroid 'Display over other apps' screen with the toggle enabled.](./assets/p074-1.png)

13. Go back to MacroDroid and re-select 'If Confirmed Then'.
14. In the prompt, you need to change the dialog title and dialog message. For these to show who's calling and the number associated with the caller, select `{call_name}` and `{call_number}` from the '...' on the right.

    ![The 'If Confirmed Then' dialog config with the '...' buttons highlighted.](./assets/p074-2.png)

15. Your dialog prompt should look similar to the one below.

    ![The 'If Confirmed Then' config filled with {call_name}, {call_number}, Accept and Decline.](./assets/p075-1.png)

16. Select 'OK' once you're happy with how the text will appear on the dialog box.
17. Select 'End If'.

    ![The macro showing 'If Confirmed Then' and 'End If'.](./assets/p075-2.png)

18. Select 'Add action above'.
    a. This will add an action to the if-then-else statement that we just created.

    ![The 'End If' context menu with 'Add action above' highlighted.](./assets/p076-1.png)

19. Under 'Applications', find and select 'Launch Application'.

    ![The 'Add Action' screen with 'Launch Application' highlighted.](./assets/p076-2.png)

20. Select 'Select Application' and 'OK' and find LightOS in your applications.
21. Select LightOS.
22. For Launch Options, make sure no options are selected and select 'OK'.

    ![The 'Select Option' and 'Select Launch Options' dialogs.](./assets/p077.png)

23. Select 'End If'.

    ![The macro showing 'Launch Phone' and 'End If'.](./assets/p078-1.png)

24. Select 'Add action above'.

    ![The 'End If' context menu with 'Add action above' highlighted.](./assets/p078-2.png)

25. Under 'Phone', select 'Answer Call.'

    ![The 'Add Action' screen with 'Answer Call' highlighted under Phone.](./assets/p079-1.png)

26. For the delay, select 'No Delay' and then select 'OK'.

    ![The 'Delay Before Answering' dialog with 'No Delay' selected.](./assets/p079-2.png)

27. Select 'If Confirmed Then'.

    ![The macro showing the 'If Confirmed Then' block expanded with Launch Phone and Answer Call.](./assets/p080-1.png)

28. Select 'Add else clause'.

    ![The context menu with 'Add else clause' highlighted.](./assets/p080-2.png)

29. Select 'End If'.

    ![The macro showing 'Else' and 'End If'.](./assets/p081-1.png)

30. Select 'Add action above'.

    ![The 'End If' context menu with 'Add action above' highlighted.](./assets/p081-2.png)

31. Select 'Reject Call'.

    ![The 'Add Action' screen with 'Call Reject' highlighted under Phone.](./assets/p082-1.png)

##### Constraints

32. In the 'Constraints' box, select the '+' to add a constraint.

    ![The macro with the Constraints '+' button highlighted.](./assets/p082-2.png)

33. Under 'Device State', find and select 'Application Running'.

    ![The 'Add constraint' screen with 'Application Running' highlighted under Device State.](./assets/p083-1.png)

34. You will be given a prompt requiring usage access. Select 'OK'.

    ![The 'Usage Access Required' dialog with 'OK' highlighted.](./assets/p083-2.png)

35. Find and select MacroDroid.

    ![The 'Usage access' list with 'MacroDroid' highlighted.](./assets/p084-1.png)

36. Enable 'Permit Usage Access'.

    ![The MacroDroid 'Usage access' screen with 'Permit usage access' enabled.](./assets/p084-2.png)

37. Go back to MacroDroid and re-select 'Application Running'.
38. Select 'Not in foreground' and select 'OK'.

    ![The 'Select Option' dialog with 'Not in foreground' selected.](./assets/p085.png)

39. Select 'Use Either Mechanism' and select 'OK'.

40. Select 'Select Application(s)' and select 'OK'.

    ![The 'Select Option' dialog with 'Select Application(s)' selected.](./assets/p086-1.png)

41. Find and select LightOS and select 'OK'.

    ![The 'Select Application(s)' list with 'LightOS' checked.](./assets/p086-2.png)

42. Finish by adding a name to the macro and saving it.

    ![The macro with a name entered and the save button highlighted.](./assets/p087-1.png)

With the macro complete, you'll be able to accept calls and interact with the call in LightOS, or decline it, without needing to be in LightOS. Here is an example of the dialog box in use:

![The call-handling dialog box showing an unknown caller with DECLINE and ACCEPT buttons.](./assets/p087-2.png)

#### Option 2: Immediate boot into LightOS

This is another option that follows the original modding guide but shows you how to set it up. This will immediately boot you into LightOS if you're on the Android layer if you are receiving a call.

##### Trigger

1. Select 'Add Macro'.

    ![The MacroDroid home screen with 'Add Macro' highlighted.](./assets/p088-1.png)

2. In the 'Triggers' box, select the '+' to add a trigger.

    ![An empty macro with the Triggers '+' button highlighted.](./assets/p088-2.png)

3. Select 'Call / SMS'.

    ![The 'Add Trigger' list with 'Call/SMS' highlighted.](./assets/p089-1.png)

4. Select 'Call Incoming'.

    ![The 'Call/SMS' trigger list with 'Call Incoming' highlighted.](./assets/p089-2.png)

5. Select 'Allow' so that MacroDroid can access phone call logs.
6. Select 'Allow' so that MacroDroid can manage phone calls.

    ![MacroDroid permission dialogs for call logs and managing phone calls, with 'ALLOW' highlighted.](./assets/p090.png)

7. Select 'Any Number' and press 'OK'.

##### Actions

8. In the 'Actions' box, select the '+' to add a new action.

    ![The macro with the 'Call Incoming' trigger, Actions '+' button highlighted.](./assets/p091-1.png)

9. In 'Applications', find and select 'Launch Application'.

    ![The 'Add Action' screen with 'Launch Application' highlighted.](./assets/p091-2.png)

10. Select 'Select Application' then 'OK'.
11. Find LightOS in your applications.
12. For Launch Options, unselect all options and then select 'OK'.

    ![The 'Select Option' and 'Select Launch Options' dialogs.](./assets/p092.png)

13. Add a name to your macro and save it.

    ![The completed macro showing the 'Call Incoming' trigger and 'Launch Phone' action.](./assets/p093.png)

### Notification handling

Notification handling is another issue we run into. With `light_mode` active, Hybrid users will lose key missing UI elements such as call UI, notification pop-ups, etc. We want our notifications to appear for us with the option for them to also appear on LightOS so we don't miss anything important (i.e. WhatsApp messages).

For notification handling in Hybrid Mode, there are a few different ways you can go about this depending on your use case and familiarity with macros, but the following has been tested and working:

- Simple overlay bar

#### Simple overlay

For this version of notification handling, the goal is for MacroDroid to recognise a notification and display an overlay box for us to be able to see it. We should be able to clear it ourselves or have it disappear after a set time. We won't be able to open the app, but we should be able to see the notification and go from there.

##### Trigger

1. Select 'Add macro'.

    ![The MacroDroid home screen with 'Add Macro' highlighted.](./assets/p094-1.png)

2. In the 'Triggers' box, select the '+' to add a trigger.

    ![An empty macro with the Triggers '+' button highlighted.](./assets/p094-2.png)

3. Under 'Device Events', find and select 'Notifications'.

    ![The 'Add Trigger' list with 'Notification' highlighted under Device Events.](./assets/p095-1.png)

4. Select 'Notification Received' and then select 'OK'.

    ![The 'Select Option' dialog with 'Notification Received' selected.](./assets/p095-2.png)

5. For applications, you have the option to select certain applications or all. This depends on your particular use case.

    ![The 'Select Option' dialog with 'Any Application' selected.](./assets/p096-1.png)

6. For additional options, I left it as the default but you're welcome to edit these if you wish. Once done, select 'OK'.

    ![The 'Notification Received' options screen.](./assets/p096-2.png)

    ![The 'Notification Received' options screen scrolled down, with 'OK' highlighted.](./assets/p097-1.png)

7. Your trigger should look like one of the following:

    ![Two examples of the Triggers box: 'Any Content (All applications)' and 'Any Content (Signal, QUIK, Phone)'.](./assets/p097-2.png)

##### Actions

8. In the 'Actions' box, select the '+' to add an action.

    ![The macro with the 'Notification Received' trigger, Actions '+' button highlighted.](./assets/p098-1.png)

9. Under 'MacroDroid Specific', find and select 'Overlay Bar'.

    ![The 'Add Action' screen with 'Overlay Bar' highlighted under MacroDroid Specific.](./assets/p098-2.png)

10. You'll be given a prompt with all of your options. It will initially be empty. For this, we want the application, the title and the text of the notification to appear. You can find the options in the '...' on the right.

    ![The empty 'Overlay Bar' config with the '...' buttons highlighted.](./assets/p099.png)

11. After adding the information you want to display, it should look something like this:

    ![The 'Overlay Bar' config filled with {not_app_name} - {not_title} and {notification}.](./assets/p100.png)

12. You can also change the background colour, text colour and overlay position.
    a. I opted for a grey or dark grey background at 13% transparency.
    b. White text for high contrast.
    c. Position at < 25% (this determines how high on the screen it will appear).

    ![The 'Overlay Bar' config showing the background colour, text colour and position controls.](./assets/p101-1.png)

13. Verify 'Show as Overlay' is true.

    ![The 'Overlay Bar' config with 'Show as Overlay?' set to True.](./assets/p101-2.png)

14. At the bottom of the prompt, select 'Add Action Button'.

    ![The 'Overlay Bar' config with 'ADD ACTION BUTTON' highlighted.](./assets/p102-1.png)

15. Change the label to say 'Clear' and select 'Clear notification on press'.

    ![The Action Button config with the label 'Clear' and 'Clear notification on press' checked.](./assets/p102-2.png)

16. Select 'OK' when finished.
17. In the 'Actions' box, select the '+' to add another action.

    ![The macro with the 'Overlay Bar' action, Actions '+' button highlighted.](./assets/p103-1.png)

18. Under 'Macros', find and select 'Wait Before Next Action'.

    ![The 'Add Action' screen with 'Wait Before Next Action' highlighted under Macros.](./assets/p103-2.png)

19. On the 'Delay Period' prompt, select how long you want the overlay to stay on the screen. I opted for 10 seconds. Unselect 'Use alarm' at the bottom and select 'OK'.

    ![The 'Delay Period' dialog set to 10 seconds with 'Use alarm' unchecked.](./assets/p104-1.png)

20. In the 'Actions' box, select the '+' to add another action.

    ![The macro with 'Overlay Bar' and 'Wait 10 seconds' actions, Actions '+' button highlighted.](./assets/p104-2.png)

21. Under 'MacroDroid Specific', find and select 'Clear MacroDroid Dialog'.

    ![The 'Add Action' screen with 'Clear MacroDroid Dialog' highlighted under MacroDroid Specific.](./assets/p105-1.png)

22. Your actions box should look like this:

    ![The Actions box showing 'Overlay Bar', 'Wait 10 seconds' and 'Clear MacroDroid Dialog'.](./assets/p105-2.png)

Testing out the overlay:

![Two screenshots of the notification overlay bar in use.](./assets/p104-3.png)

Now, we can add the constraints to make sure they appear in LightOS as well.

##### Constraints

23. In the 'Constraints' box, select the '+' to add a constraint.

    ![The macro with the Constraints '+' button highlighted.](./assets/p106.png)

24. Under 'Device State', find and select 'Application Running'.

    ![The 'Add constraint' screen with 'Application Running' highlighted under Device State.](./assets/p107-1.png)

25. Select 'Running in foreground' and then select 'OK'.

    ![The 'Select Option' dialog with 'Running in foreground' selected.](./assets/p107-2.png)

26. Select 'Use Either Mechanism' and then select 'OK'.

27. Select 'Select Application(s)' and then select 'OK'.

    ![The 'Select Option' dialog with 'Select Application(s)' selected.](./assets/p108-1.png)

28. Find and select LightOS in your applications and then select 'OK'.

29. Repeat steps #23-#28 for 'Not in foreground'.

    ![The 'Select Option' dialog with 'Not in foreground' selected.](./assets/p108-2.png)

30. On the main screen, change the logic gate to 'OR'
    a. This is so the notification will appear in both LightOS and the Android layer.

    ![The Constraints box with the logic gate set to 'OR' and both 'Not foreground' and 'App foreground' constraints for LightOS.](./assets/p109.png)

31. Name and save your macro.
