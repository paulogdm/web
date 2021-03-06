---
title: 🎠 Publishing plugins
slug: dev/store/publishing

---

Fundamentals:
* The store is managed by Manifest files.
* Each Manifest represents a plugin.
* The Manifests are stored in https://github.com/Graviton-Code-Editor/store-api/tree/master/data in each's folder
* [Manifest schema](manifest)


## 🎉 Publishing a plugin

> **Important**: The plugin must have a decent quality to be published, and will be reviewed by maintainers. 

* Fork and clone https://github.com/Graviton-Code-Editor/store-api/
* Create a folder under store-api/data with your plugin's name
* Create the Manifest (`manifest.yaml`) inside your plugin's folder.
* Make a Pull Request to merge it

## 🔄 Updating a published plugin
To publish a new release, add the new release to the `releases` property in `manifest.yaml` and create a pull request with the updated manifest.
