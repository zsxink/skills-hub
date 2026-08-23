# 写作内核原子字典（kernel_skills）

本文件是 **handbook-paper-writer** 技能套件的「技法字典」。14 个专项技能（连同 1 个主技能共 15 个技能）在各自 SKILL.md 中以「参考 Kxx」引用此处条目。原子本身不独立成 agent——它们是被组合引用的技法单元。每条原子**恰好由一个专项技能拥有、由一个门禁（或自身）检查**。

> 注：写方自查（anti-slop）与两道体验层门禁（gate-reader / gate-reread）是横切检查，不拥有 K 原子，有自己的维度体系（concreteness/stance/presence；comprehension/order/motivation；logic/pacing/depth/closure）。

## 系列声音（series_voice）

橙皮书的声音是「一个跟你同代、亲手干过、不替产品打圆场的第一人称实践者」：他用『我踩过／我在本机跑过／我核过三遍』建立权威，而不是用职称和客观腔。语气是强口语的（「说白了」「挺荒诞的」「翻白眼是正常的」），句子短、爱用独立成段的判决句把一段机制压成一句可转述的话（「模型还是那个模型，多出来的是一双手。」）。招牌动作有四个：先抛一句反直觉断言或一个不圆整的真数字当钩子；用「不是A，而是B」掐掉读者最可能的误读；给一个家常类比再交代它在哪里失真或哪里有代价；每章末尾用收尾交付物（一句断言／原则清单／自问清单）把内容转成可带走的原则——若本书定位需要更强的连载感，可选用同名固定栏目（「他们本来想这么做，后来没做」「这个系统能教我们什么」「花叔说」），但同名栏目不是全系列强制。它把诚实当成修辞：数字带取数命令和快照时刻，没验的地方直说「这条别照着我说的信」，好处后面一定跟一句代价。整套声音服务于同一个立场——读者不必是专家也能自己判断，所以作者的任务是把判断的方法交出去，而不是把结论塞进去。

## 四维总括

- **结构**：每章都是一条被设计过的注意力曲线：首句用论断／反差数字／亲历翻车抓住人，紧跟一份「只答什么、不答什么」的契约与前置结论，中段沿一次真实实测或「你以为→其实→为什么」的骨架推进，末尾用收尾交付物（一句断言／原则清单／自问清单三选一，同名固定栏目是可选强化项而非全系列强制）交付可迁移原则并抛出下一章的悬念，让十几章连成连载而不是并列模块。

- **讲解**：讲解的统一策略是「把未知锚在已知上，再用可核查的具体物钉死」：先用同一套隐喻母体和读者的旧工具搭桥，再给最小可运行样本、精确数字、取数口径和验证边界标注，并主动替读者提出天真反问、用『但』字撤掉地毯，使理解与怀疑同步发生。

- **视觉**：几乎零配图，视觉负载全部由「表格＋带注释代码块＋callout」三件套承担，且表格不只是排版而是论证工具——单变量双跑对照、占比排序把反差做成版面，代码块与命令块则是可复制的教具和可复现的证据。callout 是单一样式、双用途（引文/原话、坑与边界）的强调框，密度与信息密度成正比（每章 3-7 个，信息密集章可达 8-10 个），其中必有一个承载全章最该记住的那句。

- **一致性**：一致性靠制度而非自觉：固定章节骨架（双语标题＋小节目录＋收尾交付物）、一词一义的术语纪律、密集的跨章指针与权威版本声明、稳定的第一人称人设与两三个招牌句式，再叠加时效标注和「好处必配代价」的双面记账，让全系列读起来像同一个人在同一张桌子上连续说话。发布层（扉页元数据、导航页统计、附录编号）同样纳入系列骨架，让「系列感」不靠写作自觉而靠成书模板；运营层（⑥ 修订维护、版本滚动、跨书术语对齐）让书「活」下去，而不是一次性写完就过时。


## 原子清单（38 条，按维度，含归属与门禁）

| K | 名称 | 维度 | 归属技能 | 门禁检查 |
|---|---|---|---|---|
| K01 | 章题写成读者原话疑问或收益承诺 | 结构 | handbook-outline | handbook-gate-structure |
| K02 | 首句即论断，不写背景铺垫 | 结构 | handbook-outline | handbook-gate-structure |
| K03 | 开场钩子：反直觉断言/硬数字/亲历翻车先上桌，实测时间线当骨架 | 结构 | handbook-outline | handbook-gate-structure |
| K04 | 章首签契约、结论先交付 | 结构 | handbook-outline | handbook-gate-structure |
| K05 | 小节标题写成带反转的完整句 | 结构 | handbook-outline | handbook-gate-structure |
| K06 | 操作内容编号化成流程骨架 | 结构 | handbook-outline | handbook-gate-structure |
| K07 | 「你以为→其实→为什么更好」三段式 | 结构 | handbook-outline | handbook-gate-structure |
| K08 | 末句交接棒，下章首句接住 | 结构 | handbook-outline | handbook-gate-structure |
| K09 | 章末收尾交付物：一句断言/原则清单/自问清单三选一，下章钩子收尾；同名固定栏目为可选强化项 | 结构 | handbook-outline | handbook-gate-structure |
| K10 | 全书路线图与章型节奏编排 | 结构 | handbook-outline | handbook-gate-structure |
| K11 | 篇幅预算：每节/每章字数配比与取舍，目标字数公开标注进导航页 | 结构 | handbook-outline | handbook-gate-structure |
| K12 | 单一隐喻母体贯穿，新概念挂回母体 | 讲解 | handbook-metaphor-research | handbook-gate-plain |
| K13 | 类比后立刻声明失真点 | 讲解 | handbook-metaphor-research | handbook-gate-plain |
| K14 | 由已知推未知的递进披露 | 讲解 | handbook-draft | handbook-gate-plain |
| K15 | 最小可运行样本先行 | 讲解 | handbook-draft | handbook-gate-plain |
| K16 | 机制链与边界对比替代下定义 | 讲解 | handbook-draft | handbook-gate-plain |
| K17 | 替读者提天真反问，再用「但」字撤地毯 | 讲解 | handbook-draft | handbook-gate-plain |
| K18 | 引文三段式：原文→人话→为何关键 | 讲解 | handbook-draft | handbook-gate-plain |
| K19 | 证据可信：精确数字带取数口径，并按实测/读文档/未验分级标注、可复现验 | 讲解 | handbook-topic-research | handbook-gate-fact |
| K20 | 好坏示例并置与一句话微例 | 讲解 | handbook-draft | handbook-gate-plain |
| K21 | 给判断线与场景落点，不替读者决定 | 讲解 | handbook-draft | handbook-gate-plain |
| K22 | 负面示范先行：先给❌负面示范建张力，再给✅正确做法 | 讲解 | handbook-draft | handbook-gate-plain |
| K23 | 零配图三件套，按表→码→释推进 | 视觉 | handbook-layout | handbook-layout |
| K24 | 维度×选项对照表做决策 | 视觉 | handbook-layout | handbook-layout |
| K25 | 「你以为／实际是」纠错表与体感列 | 视觉 | handbook-layout | handbook-layout |
| K26 | 让表格的结构本身完成论证 | 视觉 | handbook-layout | handbook-layout |
| K27 | callout 单一样式双用途（引文/原话、坑与边界），密度与信息密度成正比且含 1 个最该记住句 | 视觉 | handbook-layout | handbook-layout |
| K28 | 代码与命令块＝可复制教具＋可核证物 | 视觉 | handbook-code | handbook-code |
| K29 | 纯文本图：ASCII 树与箭头链路 | 视觉 | handbook-diagram | handbook-diagram |
| K30 | 附录做成带保质期的速查表 | 视觉 | handbook-layout | handbook-layout |
| K31 | 系列级骨架模板：封面元数据+导航页统计+章节骨架（§编号/Part分区/双语标题）+收尾交付物 | 一致性 | handbook-outline | handbook-gate-structure |
| K32 | 系列声音：第一人称人设+口语尺度+招牌句式与固定标记词 | 一致性 | handbook-draft | handbook-gate-consistency |
| K33 | 非专家身份当取材标准与安抚装置 | 一致性 | handbook-topic-research | handbook-gate-consistency |
| K34 | 术语纪律：首见给人话定义，全书一词一义 | 一致性 | handbook-draft | handbook-gate-consistency |
| K35 | 跨章引用织网并指定权威版本 | 一致性 | handbook-draft | handbook-gate-consistency |
| K36 | 两面记账：好处必配代价，不替对象打圆场 | 一致性 | handbook-draft | handbook-gate-consistency |
| K37 | 时效与口径诚实，禁夸张话术 | 一致性 | handbook-topic-research | handbook-gate-fact |
| K38 | 系列自指：交代写作方法与读者分流 | 一致性 | handbook-topic-research | handbook-gate-consistency |
