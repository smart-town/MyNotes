# README

## Design

1. 整个系统作为一个自动处理多个或单个任务的工具。任务主要是根据指定的源目录，以及对应的目标路径，进行指定的一些操作（远程复制、解压、备份或这些操作的集合）

2. 系统划分：
    - 配置层【负责收集源目录以及对应目标路径的信息】
    - 功能层【各个单独功能如远程复制、解压、备份等】
    - 统一处理层【负责整体工具的交互、协调配置信息与功能调用】