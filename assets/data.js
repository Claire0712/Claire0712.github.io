export const profile = {
  name: { zh: '张诗卓', en: 'Shizhuo Zhang' },
  title: { zh: '香港理工大学本科生', en: 'Undergraduate student at\nThe Hong Kong Polytechnic University' },
  intro: {
    zh: '我关注城市系统、可持续能源与数据驱动决策，并在遥感、知识图谱和智能体应用中积累研究与实践经验。',
    en: 'I explore urban systems, sustainable energy, and data-driven decision-making through research and practice in remote sensing, knowledge graphs, and intelligent agents.'
  },
  keywords: {
    en: ['Urban Systems', 'Sustainable Energy', 'Data-Driven Decision-Making', 'Remote Sensing', 'Knowledge Graphs', 'Intelligent Agents'],
    zh: ['城市系统', '可持续能源', '数据驱动决策', '遥感', '知识图谱', '智能体']
  },
  about: {
    zh: '现就读于香港理工大学城市信息学与智慧城市专业，辅修应用数学。我希望将定量方法、空间数据和人工智能用于理解并改善复杂的城市与环境问题。',
    en: 'I study Urban Informatics and Smart Cities at The Hong Kong Polytechnic University, with a minor in Applied Mathematics. I am interested in using quantitative methods, spatial data, and AI to understand and improve complex urban and environmental problems.'
  },
  email: 'clairez.zhang@connect.polyu.hk',
  github: 'https://github.com/Claire0712',
  location: { zh: '中国香港', en: 'Hong Kong SAR' }
};

export const currentUpdates = [
  {
    title: { zh: 'Nature Communications', en: 'Nature Communications' },
    status: { zh: '进行中', en: 'In progress' },
    detail: { zh: '共同作者 · 北京大学深圳研究支持 · 预计 9 月投稿', en: 'Co-author · Supported by Peking University Shenzhen · Target submission: September' }
  }
];

export const research = [
  {
    period: 'Apr 2026 — Present',
    researchLayout: true,
    title: { zh: '学生研究助理', en: 'Student Research Assistant' },
    organization: { zh: '北京大学城市规划与设计学院智慧城市实验室 · 深圳，中国', en: 'Smart Cities Lab, School of Urban Planning and Design, Peking University · Shenzhen, China' },
    summary: { zh: '开展电网韧性与能源—气候相互作用的数据驱动分析和建模。', en: 'Conduct data-driven analysis and modeling on power-grid resilience and energy-climate interactions for sustainable energy systems.' },
    logo: { src: './assets/media/pku-smart-cities-lab-logo.png', invert: true }
  },
  {
    period: 'Nov 2025 — Feb 2026',
    researchLayout: true,
    title: { zh: '学生研究助理', en: 'Student Research Assistant' },
    organization: { zh: '香港理工大学纺织与服装学院 · 中国香港', en: 'School of Fashion and Textiles, The Hong Kong Polytechnic University · Hong Kong SAR' },
    summary: { zh: '构建纺织与服装问答 RAG 原型，并支持知识图谱整理、实体识别与检索评估。', en: 'Build a RAG prototype for fashion and textiles QA; support knowledge-graph curation, named entity recognition, and retrieval evaluation.' },
    cardBullets: [
      { zh: '构建面向纺织与服装问答的领域专用检索增强生成（RAG）原型，通过精选文档和结构化知识为大语言模型输出提供依据。', en: 'Built a domain-specific Retrieval-Augmented Generation (RAG) prototype for fashion/textiles QA by grounding LLM outputs on curated documents and structured knowledge.' },
      { zh: '支持端到端领域知识图谱构建，包括整理实体、标注关系并扩展图谱覆盖范围。', en: 'Supported end-to-end construction of a domain knowledge graph by organizing entities, annotating relationships, and expanding graph coverage.' },
      { zh: '实现基于 BERT 的命名实体识别（NER）模型，自动提取领域实体，服务后续检索与索引。', en: 'Implemented a BERT-based named entity recognition (NER) model to automate extraction of domain-specific entities for downstream retrieval/indexing.' },
      { zh: '开发知识图谱查询与推理逻辑，并通过文献调研和针对性测试协助评估检索与回答质量。', en: 'Developed knowledge graph querying/reasoning logic and helped evaluate retrieval and answer quality through literature review and targeted testing.' }
    ],
    logo: './assets/media/polyu-sft-logo.png'
  },
  {
    period: 'Apr 2025 — May 2025',
    researchLayout: true,
    title: { zh: '学生助理', en: 'Student Assistant' },
    organization: { zh: '香港理工大学计算学系 · 中国香港', en: 'Department of Computing, The Hong Kong Polytechnic University · Hong Kong SAR' },
    summary: { zh: '审查图像数据质量并完成数据清洗，支持研究工作流。', en: 'Review image-data quality and clean data to support research workflows.' },
    logo: './assets/media/polyu-comp-logo.png'
  }
];

export const projects = [
  {
    period: 'Jul 2026',
    cardLayout: true,
    title: { zh: '无人机驱动智能体网页原型', en: 'UAV-Informed Intelligent Agent Web Prototype' },
    organization: { zh: '武汉大学遥感信息工程学院 · 湖北武汉', en: 'School of Remote Sensing and Information Engineering, Wuhan University · Wuhan, China' },
    summary: { zh: '面向羊楼洞茶文化旅游辅助与茶厂采摘决策搭建双视角网页智能体，结合无人机观测和 NDVI 等遥感指标，支持地块成熟度评估、采摘优先级排序、外业路线建议，以及中英双语行程规划与知识卡片。', en: 'Built a two-perspective web-agent prototype for Yangloudong tea-culture tourism assistance and tea-factory harvest decisions, using UAV observations and remote-sensing indicators such as NDVI for plot-level maturity assessment, harvest prioritization, routing, bilingual itinerary planning, and knowledge cards.' },
    cardBullets: [
      { zh: '搭建面向羊楼洞茶文化旅游辅助与茶厂采摘决策支持的双视角网页智能体原型。', en: 'Built a two-perspective web agent prototype for Yangloudong tea-culture tourism assistance and tea-factory harvest decision support.' },
      { zh: '使用无人机（UAV）外业观测与遥感指标（如 NDVI），支持地块成熟度评估、采摘优先级排序以及外业团队路线建议。', en: 'Used drone (UAV) field observations and remote-sensing indicators (e.g., NDVI) to support plot-level maturity assessment, harvest-priority ranking, and routing suggestions for field teams.' },
      { zh: '实现中英双语用户体验流程，支持行程规划、知识卡片与结构化决策支持输出。', en: 'Implemented bilingual (CN/EN) UX flows for itinerary planning, knowledge cards, and structured decision-support outputs.' }
    ],
    website: 'https://claire0712.github.io/Service-Learning/',
    code: 'https://github.com/Claire0712/Service-Learning',
    cardLogos: ['./assets/media/whu-rsgis-logo.png']
  }
];

export const academicWorks = [
  {
    category: 'publication',
    title: { zh: 'ThermalCareBench：热偏好支持的可审计多模态智能体评测', en: 'ThermalCareBench: Auditable Multimodal Agent Evaluation for Thermal-Preference Support' },
    note: { zh: 'MMM2027 在投', en: 'MMM2027 Under Submission' },
    authors: [
      { name: 'Zhang, Shizhuo', equalContribution: true },
      { name: 'Liu, Wentao', equalContribution: true },
      { name: 'Fang, Kun' },
      { name: 'Chen, Yutong' }
    ],
    abstract: { zh: '提出一个用于热偏好支持的多模态智能体评测基准。该基准基于 14 名参与者的 3,843 条可穿戴设备、环境、行为与历史观测，设置部分可观测的工具调用环境，并从偏好一致性、证据充分性、行动安全性、工具预算和范围约束等维度进行评估。', en: 'This work introduces an auditable benchmark for thermal-preference support from wearable, environmental, behavioural, and historical evidence. Using 3,843 observations from 14 adults, it evaluates partially observed, tool-mediated trajectories for preference agreement, evidence sufficiency, action safety, tool budget, and scope control.' },
    preview: './assets/media/mmm-figure.png',
    previews: ['./assets/media/mmm-figure.png', './assets/media/mmm-qapcf.png']
  },
  {
    category: 'coursePaper',
    title: { zh: '高温与卫生系统能力：中国医患关系的可复现生态学研究', en: 'When Heat Meets Health-System Capacity: A Reproducible Ecological Study of Outpatient Utilization Across China' },
    note: { zh: '北大课程论文', en: 'PKU Course Paper' },
    noteLogo: './assets/media/pku-logo.svg',
    abstract: { zh: '使用 2014、2016 与 2018 年中国 31 个省级单元的公开数据，考察暖季 Humidex 与人均门诊量之间的关联是否因滞后医疗服务能力而异。研究整合人口加权 ERA5、WorldPop 与官方卫生统计，结果未发现能力修饰效应的精确证据；结论限定为省级生态关联，而非个体短期效应或资源配置的因果效应。', en: 'Using publicly auditable data for 31 Chinese provincial units in 2014, 2016, and 2018, this reproducible ecological study tests whether the warm-season Humidex–outpatient association differs by lagged health-care capacity. It combines population-weighted ERA5, WorldPop, and official health statistics; the results provide no precise evidence of capacity effect modification and are limited to province-year ecological associations.' },
    preview: './assets/media/pku-figure.png',
    pdf: './PKUcourse/main_副本.pdf',
    code: 'https://github.com/Claire0712/pku-program'
  },
  {
    category: 'coursePaper',
    title: { zh: '香港与新加坡智慧城市路径比较：交通、能源与经济', en: 'A Comparative Analysis of Smart City Trajectories: Mobility, Energy, and Economy in Hong Kong and Singapore' },
    note: { zh: 'Course Paper', en: 'Course Paper' },
    abstract: { zh: '本研究从智慧交通、智慧能源与智慧经济三个维度比较香港与新加坡的智慧城市路径。结合时空可视化与普通最小二乘回归，研究讨论动态定价、交通拥堵、经济发展与电动车基础设施之间的关系，并提出兼顾政府主导公平、开放数据标准和市场驱动本地创新的混合治理框架。', en: 'This comparative study examines smart-city trajectories in Hong Kong and Singapore through smart mobility, energy, and economy. Combining spatiotemporal visualisation and OLS regression, it considers dynamic pricing, congestion, economic development, and EV infrastructure, and proposes a hybrid governance framework that combines public equity, open-data standards, and local market innovation.' },
    preview: './assets/media/hk-ev-distribution.png',
    previews: ['./assets/media/hk-ev-distribution.png', './assets/media/sg-ev-distribution.png'],
    pdf: './LSGI2801.pdf'
  },
  {
    category: 'coursePaper',
    title: { zh: '埃博拉传播的时空动力学：局部干预的基于智能体评估', en: 'Spatiotemporal Dynamics of Ebola Transmission: An Agent-Based Evaluation of Localized Interventions' },
    note: { zh: 'Course Paper', en: 'Course Paper' },
    abstract: { zh: '本研究在 NetLogo 中构建空间显式的 SEIHCR 智能体模型，模拟埃博拉传播并评估医院隔离、安全埋葬、疫苗接种及其组合等局部非药物干预。计算实验显示，安全埋葬可有效切断遗体接触传播途径；与适度扩充医疗能力和疫苗接种结合时，可协同降低传播强度和死亡风险。', en: 'This study develops a spatially explicit SEIHCR agent-based model in NetLogo to simulate Ebola transmission and assess localized non-pharmaceutical interventions: hospital isolation, safe burial, vaccination, and their combinations. Experiments show that safe burial effectively removes post-mortem transmission and, combined with moderate health-care expansion and vaccination, can synergistically reduce transmission and mortality.' },
    preview: './assets/media/ebola-interventions.png',
    pdf: './LSGI2801_Assignment.pdf'
  }
];

export const education = [
  {
    period: 'Sep 2024 — Expected Jun 2028',
    school: { zh: '香港理工大学', en: 'The Hong Kong Polytechnic University' },
    title: { zh: '城市信息学与智慧城市理学学士', en: 'BSc in Urban Informatics and Smart Cities' },
    organization: { zh: '建筑及环境学院', en: 'Faculty of Construction and Environment' },
    summary: { zh: '辅修应用数学', en: 'Minor in Applied Mathematics' },
    compactLayout: true,
    schoolLogos: ['./assets/media/polyu-logo.svg'],
    emphasizeSummary: true,
    cardLayout: true,
    cardLogos: ['./assets/media/polyu-logo.svg'],
    cardMeta: { zh: '城市信息学与智慧城市理学学士 · 中国香港', en: 'BSc in Urban Informatics and Smart Cities · Hong Kong SAR' },
    cardBullets: [
      { zh: '建筑及环境学院', en: 'Faculty of Construction and Environment' },
      { zh: '辅修应用数学', en: 'Minor in Applied Mathematics' }
    ]
  }
];

export const awards = [
  {
    period: '2024',
    hideSummary: true,
    title: { zh: '美国数学邀请赛（AIME）10 分（满分 15 分）', en: 'American Invitational Mathematics Examination (AIME): 10/15' },
    organization: { zh: '美国数学协会', en: 'Mathematical Association of America' },
    summary: { zh: 'AIME 成绩为 10 分（满分 15 分）。', en: 'Scored 10 out of 15.' }
  },
  {
    period: '2023',
    hideSummary: true,
    title: { zh: '美国数学竞赛 AMC 12 全球前 5%', en: 'American Mathematics Competition 12: Global Top 5%' },
    organization: { zh: '美国数学协会', en: 'Mathematical Association of America' },
    summary: { zh: '在 AMC 12 中位列全球前 5%。', en: 'Ranked in the global top 5%.' }
  },
  {
    period: '2023',
    hideSummary: true,
    title: { zh: '第 22 届中国女子数学奥林匹克 — 三等奖', en: '22nd Chinese Girls’ Mathematical Olympiad — Third Prize' },
    organization: { zh: '中国数学会', en: 'Chinese Mathematical Society' },
    summary: { zh: '获第 22 届中国女子数学奥林匹克三等奖。', en: 'Received Third Prize at the 22nd Chinese Girls’ Mathematical Olympiad.' }
  },
  {
    period: '2023',
    hideSummary: true,
    title: { zh: '中国数学奥林匹克贵州赛区 — 二等奖', en: 'Chinese Mathematical Olympiad, Guizhou Division — Second Prize' },
    organization: { zh: '中国数学会', en: 'Chinese Mathematical Society' },
    summary: { zh: '获贵州赛区二等奖。', en: 'Received the Guizhou Division Second Prize.' }
  }
];
