# antd-open-browser

Quickly open the antd component

## Description

A plugin to open the [antd](https://ant.design/) component document in Flow Launcher

## Config

### Set the version of antd

![](./src/assets/config/1.png)

### Set the language of antd

![](./src/assets/config/2.png)

## Usage

### Default display all components

![](./src/assets/option/1.png)

### Search by component name

![](./src/assets/option/2.png)

### Search by component Chinese name

![](./src/assets/option/3.png)

### Search by component category

![](./src/assets/option/4.png)

## Install

### Install with Flow Launcher

```bash
pm install AntdOpenBrowser
```

## TODO

- [x] Add Set the version of antd
- [x] Add Set the language of antd
- [ ] Add Set the base url of antd
- [ ] Integrate configuration items. Unified use of `set` configuration, such as: `at set version`, `at set language`...
- [ ] Automatically filter component libraries based on version. Prevent opening non-existent components in low versions
- [ ] Fix the bug that advanced components cannot be opened
- [ ] The list only displays the Chinese and English names of the components, not the categories of the components
- [ ] Internationalization configuration. According to the set language, display the corresponding prompt information
