// src/data/learningResourcesCatalog.js
// Normalized, Canonical Learning Resource Catalog for SkillBridge
// Legitimate educational metadata from recognized international universities,
// standards bodies, official documentation, and curated professional institutes.

export const RESOURCE_TYPES = {
  ARTICLE: "ARTICLE",
  PDF: "PDF",
  BOOK: "BOOK",
  VIDEO: "VIDEO",
  DOCUMENTATION: "DOCUMENTATION",
  LAB: "LAB",
  PROJECT: "PROJECT",
  PRACTICE: "PRACTICE"
};

export const LEARNING_RESOURCES_CATALOG = [
  // =========================================================================
  // 1. COMMERCE & FINANCE — FINANCIAL ANALYST
  // =========================================================================

  // Module 1: 3-Statement Financial Modeling (step-fin-model)
  {
    id: "res-fa-mod-1",
    title: "Financial Statements Integration: P&L, Balance Sheet & Cash Flow",
    description: "Core mechanics of 3-statement linkages: how Net Income flows into Retained Earnings and Cash from Operations, and how CapEx impacts PP&E and depreciation.",
    type: "ARTICLE",
    provider: "CFA Institute / Corporate Finance Institute",
    sourceUrl: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/financial-analysis-techniques",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-model"],
    skillIds: ["3-Statement Financial Modeling", "Financial Accounting"],
    difficulty: "Beginner",
    duration: "45 mins",
    accessType: "Open Access",
    license: "Educational Attribution",
    learningObjectives: [
      "Trace Net Income from the Income Statement to Operating Cash Flow.",
      "Calculate Net Working Capital (NWC) changes and their balance sheet reflections.",
      "Build a dynamic circular debt schedule with interest expense loops in Excel."
    ],
    keyTakeaways: [
      "Operating Cash Flow = Net Income + Non-Cash Expenses - Increases in Working Capital.",
      "Ending cash from the Cash Flow Statement must equal the Cash balance on the Balance Sheet.",
      "Depreciation reduces pre-tax income, creating a tax shield that preserves cash."
    ],
    content: `### 3-Statement Financial Integration Architecture

A robust institutional financial model connects the three foundational accounting statements dynamically:

1. **Income Statement (P&L)**: Measures revenue, operating expenses (COGS, SG&A), interest, and taxes to derive Net Income.
2. **Balance Sheet**: Represents company assets, liabilities, and shareholders' equity at a specific point in time. Assets must always equal Liabilities + Shareholders' Equity.
3. **Cash Flow Statement**: Reconciles accrual-based accounting with actual liquid cash movements across Operating, Investing, and Financing activities.

#### Dynamic Linkage Points:
* **Net Income**: The bottom line of the P&L serves as the first line of Cash Flows from Operating Activities and feeds into the Statement of Retained Earnings.
* **Depreciation & Amortization**: Non-cash operating expense on the P&L; added back in Operating Cash Flows; accumulated depreciation subtracts from Gross PP&E on the Balance Sheet.
* **Working Capital Accounts**: Changes in Accounts Receivable, Inventory, and Accounts Payable represent cash inflows or outflows on the Cash Flow Statement.
* **Ending Cash**: The net change in cash on the Cash Flow Statement links directly to the Cash & Cash Equivalents line on the Balance Sheet.`
  },
  {
    id: "res-fa-mod-2",
    title: "Excel Financial Modeling Best Practices & Keyboard Navigation Standards",
    description: "Standardized institutional spreadsheet engineering: color coding rules (blue for inputs, black for formulas, green for links), dynamic naming, and dynamic scenarios.",
    type: "PDF",
    provider: "Wall Street Prep / Financial Modeling World Cup",
    sourceUrl: "https://www.fmworldcup.com/excel-modeling-standards/",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-model"],
    skillIds: ["3-Statement Financial Modeling", "Excel for Finance"],
    difficulty: "Beginner",
    duration: "1.5 hours",
    accessType: "Official Guide",
    license: "Standard Open Access",
    learningObjectives: [
      "Implement Wall Street modeling color conventions: Blue for hardcoded inputs, Black for formulas.",
      "Eliminate mouse usage using Alt-key shortcut navigation across complex multi-sheet workbooks.",
      "Construct dynamic scenario toggles using CHOOSE() and INDEX(MATCH())."
    ],
    keyTakeaways: [
      "Never hardcode numbers inside a formula cell; maintain a dedicated Assumptions block.",
      "Ensure all balance sheets include an automated zero-check validation formula (=Assets - Liabilities - Equity).",
      "Format percentages, currencies, and multiples consistently across financial schedules."
    ],
    content: `### Institutional Excel Modeling Standards

Professional investment banking and equity research models follow strict formatting rules:

* **Color Standards**:
  * **Blue Font**: Hardcoded inputs, historic figures, and management assumptions.
  * **Black Font**: Calculations, mathematical formulas, and internal row summations.
  * **Green Font**: External links referencing other worksheets or external data feeds.
  * **Red Font**: Warning indicators or active balance sheet mismatch flags.

* **Formula Architecture**:
  * Utilize UPPERCASE for all native Excel functions (e.g. \`SUM\`, \`INDEX\`, \`MATCH\`, \`XLOOKUP\`).
  * Avoid nested \`IF\` statements exceeding three layers; utilize lookup matrices or \`SWITCH\`.`
  },
  {
    id: "res-fa-mod-3",
    title: "Interactive Lab: Building an Integrated 3-Statement Balance Sheet",
    description: "Hands-on financial modeling lab: connect a corporate P&L and Balance Sheet for an Indian manufacturing company, ensuring clean cash flow reconciliation.",
    type: "LAB",
    provider: "SkillBridge Finance Lab",
    sourceUrl: "https://www.nseindia.com/companies-listing/corporate-filings-financial-results",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-model"],
    skillIds: ["3-Statement Financial Modeling", "Financial Accounting"],
    difficulty: "Intermediate",
    duration: "2 hours",
    accessType: "Free",
    license: "SkillBridge Educational Lab",
    learningObjectives: [
      "Extract audited financials from regulatory filings.",
      "Format historical financial statements and compute year-over-year growth drivers.",
      "Verify that total Assets match total Liabilities and Shareholders' Equity across 5 projection periods."
    ],
    keyTakeaways: [
      "Circularity handling requires iterative calculation enabled in Excel options.",
      "Revolving credit facilities act as the plug when operating cash flow is insufficient."
    ],
    content: `### Lab Specification: 3-Statement Model Construction

**Case Context**: You are given 3 years of audited annual reports for a manufacturing firm. Your objective is to model the subsequent 3 years of performance.

**Step-by-Step Instructions**:
1. Open the financial template and input audited revenue, COGS, and operating expenses.
2. Build the Fixed Asset & Depreciation Schedule: track Beginning PP&E, Capital Expenditures, Depreciation, and Ending PP&E.
3. Construct Working Capital schedules: compute Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), and Days Payables Outstanding (DPO).
4. Connect Net Income and D&A to the Cash Flow Statement.
5. Reconcile Ending Cash to the Balance Sheet and verify the error check reads \`0.00\`.`
  },

  // Module 2: DCF & Valuation (step-fin-dcf)
  {
    id: "res-fa-dcf-1",
    title: "Discounted Cash Flow (DCF) Valuation: Unlevered Free Cash Flow & WACC",
    description: "Comprehensive guide to DCF valuation: unlevered free cash flow (FCFF) calculation, Cost of Equity estimation via CAPM, and Weighted Average Cost of Capital (WACC).",
    type: "ARTICLE",
    provider: "Aswath Damodaran / NYU Stern School of Business",
    sourceUrl: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/dam2ed.htm",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-dcf"],
    skillIds: ["DCF & Valuation Modeling", "WACC Analysis"],
    difficulty: "Intermediate",
    duration: "1 hour",
    accessType: "Open Academic",
    license: "Creative Commons Attribution",
    learningObjectives: [
      "Compute Unlevered Free Cash Flow: EBIT*(1 - Tax Rate) + D&A - CapEx - Change in NWC.",
      "Derive Cost of Equity using Risk-Free Rate, Beta, and Equity Risk Premium (ERP).",
      "Calculate Enterprise Value and bridge to Equity Value per share."
    ],
    keyTakeaways: [
      "FCFF represents cash available to all capital providers (both debt and equity holders).",
      "WACC represents the discount rate reflecting the blended required rate of return across capital sources.",
      "Enterprise Value = Equity Value + Total Debt + Minority Interest - Cash & Equivalents."
    ],
    content: `### DCF Valuation Mathematical Framework

The Discounted Cash Flow model values a business based on the present value of its future cash flows:

$$\\text{Enterprise Value} = \\sum_{t=1}^{n} \\frac{\\text{FCFF}_t}{(1 + \\text{WACC})^t} + \\frac{\\text{Terminal Value}}{(1 + \\text{WACC})^n}$$

#### 1. Unlevered Free Cash Flow (FCFF):
$$\\text{FCFF} = \\text{EBIT} \\times (1 - t) + \\text{D\\&A} - \\text{CapEx} - \\Delta\\text{NWC}$$

#### 2. Weighted Average Cost of Capital (WACC):
$$\\text{WACC} = \\left(\\frac{E}{V} \\times K_e\\right) + \\left(\\frac{D}{V} \\times K_d \\times (1 - t)\\right)$$
Where:
* $E/V$: Equity weighting as a proportion of total enterprise capital
* $K_e$: Cost of Equity, calculated via CAPM: $K_e = R_f + \\beta \\times (R_m - R_f)$
* $D/V$: Debt weighting as a proportion of total capital
* $K_d \\times (1 - t)$: After-tax Cost of Debt

#### 3. Terminal Value Calculation (Gordon Growth Method):
$$\\text{Terminal Value} = \\frac{\\text{FCFF}_{n+1}}{\\text{WACC} - g}$$
Where $g$ is the perpetual long-term growth rate (typically bounded by GDP growth rate, 2.5%–4.5%).`
  },
  {
    id: "res-fa-dcf-2",
    title: "Terminal Value Methodologies: Gordon Growth vs. Exit Multiples",
    description: "In-depth comparison of terminal value calculations in institutional equity research, including sensitivity tables for discount rates and exit EBITDA multiples.",
    type: "PDF",
    provider: "Harvard Business Publishing / CFA Institute",
    sourceUrl: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/equity-valuation",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-dcf"],
    skillIds: ["DCF & Valuation Modeling", "Terminal Value"],
    difficulty: "Intermediate",
    duration: "45 mins",
    accessType: "Open Access",
    license: "Educational Reference",
    learningObjectives: [
      "Master the Gordon Growth Model versus the EV/EBITDA Exit Multiple method.",
      "Build a two-variable sensitivity table in Excel evaluating WACC vs Perpetual Growth Rate.",
      "Identify common valuation pitfalls and multiple over-reliance in cyclical industries."
    ],
    keyTakeaways: [
      "Terminal value frequently constitutes 60% to 80% of total Enterprise Value in a DCF.",
      "Cross-check Gordon Growth terminal value against implied exit EBITDA multiples to test reasonableness.",
      "Perpetual growth rates exceeding nominal GDP growth are mathematically unviable long-term."
    ],
    content: `### Terminal Value (TV) Analysis

Because a firm is assumed to operate as a going concern in perpetuity, the terminal value captures all cash flows beyond the discrete 5- or 10-year projection horizon.

#### Two Standard Approaches:
1. **Perpetual Gordon Growth Model**:
   * Assumes stable state growth rate $g$ into infinity.
   * Extremely sensitive to the spread between WACC and $g$.
2. **Exit Multiple Method**:
   * Multiplies the final projected year's EBITDA by a normalized industry peer multiple (e.g. 12.0x EV/EBITDA).
   * Implies that the business will be sold or valued at prevailing market transaction multiples at the end of year $n$.`
  },
  {
    id: "res-fa-dcf-3",
    title: "Valuation Lab: Build a DCF Model for a Publicly Listed Enterprise",
    description: "Hands-on project: construct an unlevered DCF model with automated WACC calculator and Monte Carlo sensitivity table for an enterprise.",
    type: "PROJECT",
    provider: "SkillBridge Valuation Lab",
    sourceUrl: "https://pages.stern.nyu.edu/~adamodar/",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-dcf"],
    skillIds: ["DCF & Valuation Modeling", "Sensitivity Analysis"],
    difficulty: "Advanced",
    duration: "3 hours",
    accessType: "Free",
    license: "Open Project",
    learningObjectives: [
      "Calculate 5-year projected FCFF based on operating margin and working capital ratios.",
      "Build dynamic Excel Data Tables (Alt + D + T) showing share price sensitivity to WACC ± 1% and Growth ± 0.5%.",
      "Write an executive valuation memo detailing target price vs prevailing market trading price."
    ],
    keyTakeaways: [
      "Intrinsic value is a range, not a single static number; sensitivity tables provide the confidence corridor.",
      "Net Debt deduction must account for restricted cash, lease obligations, and pension deficits."
    ],
    content: `### Hands-On Project: Intrinsic Valuation Model

**Deliverable**: Submit an unlocked, dynamic Excel model (.xlsx) and a 1-page investment summary.

**Requirements**:
1. Historic financials normalized for non-recurring gains/losses.
2. Unlevered Beta calculated from pure-play industry peers:
   $$\\beta_{\\text{unlevered}} = \\frac{\\beta_{\\text{levered}}}{1 + (1 - t) \\times (D/E)}$$
3. WACC schedule incorporating Sovereign 10-Year Bond yield as the Risk-Free Rate.
4. Bridge to Equity Value per share:
   $$\\text{Per Share Value} = \\frac{\\text{Enterprise Value} - \\text{Total Debt} + \\text{Cash}}{\\text{Fully Diluted Shares Outstanding}}$$`
  },

  // Module 3: Comparable Company Analysis (step-fin-comps)
  {
    id: "res-fa-comps-1",
    title: "Trading Comps & Transaction Multiples: Benchmarking & Selection",
    description: "Framework for selecting peer groups, normalizing LTM (Last Twelve Months) and NTM (Next Twelve Months) multiples, and interpreting EV/EBITDA, P/E, and EV/Sales.",
    type: "ARTICLE",
    provider: "Corporate Finance Institute / Morgan Stanley Equity Research",
    sourceUrl: "https://corporatefinanceinstitute.com/resources/valuation/comparable-company-analysis/",
    domainIds: ["comm"],
    roleIds: ["Financial Analyst"],
    moduleIds: ["step-fin-comps"],
    skillIds: ["Comps & Multiples", "Relative Valuation"],
    difficulty: "Intermediate",
    duration: "1 hour",
    accessType: "Open Access",
    license: "Educational Attribution",
    learningObjectives: [
      "Define criteria for comparable peer universe: geography, industry sub-sector, growth profile, and margin tier.",
      "Calculate calendarized and clean LTM metrics excluding extraordinary restructuring charges.",
      "Evaluate Enterprise Value multiples vs Equity Value multiples."
    ],
    keyTakeaways: [
      "Enterprise Value multiples (EV/EBITDA, EV/EBIT) are capital-structure neutral.",
      "Equity Value multiples (P/E, Price/Book) reflect after-tax return to equity holders only.",
      "Precedent transaction multiples include a control premium (typically 20%–35% above trading comps)."
    ],
    content: `### Relative Valuation & Multiples Analysis

Comparable Company Analysis ("Comps") values a business relative to the market pricing of publicly traded peer companies with similar operational characteristics.

#### Core Valuation Multiples:
1. **EV / EBITDA**: The gold standard for capital-intensive industries; removes distortions caused by differing debt structures, interest rates, and depreciation schedules.
2. **Price / Earnings (P/E)**: Useful for financial institutions and mature consumer companies where capital expenditure is modest.
3. **EV / Revenue**: Used primarily for high-growth SaaS, early-stage biotechnology, and companies with temporarily negative EBITDA.

#### Normalization Procedure:
* Clean LTM figures by removing one-off legal settlements, restructuring costs, and asset impairments.
* Adjust for stock-based compensation (SBC) consistency across the peer set.`
  },

  // =========================================================================
  // 2. MANAGEMENT — BUSINESS ANALYST
  // =========================================================================

  // Module 1: Requirements Engineering (step-ba-req)
  {
    id: "res-ba-req-1",
    title: "BABOK Guide: Requirements Elicitation, BRD & Functional Specs",
    description: "Foundational Business Analysis Body of Knowledge (BABOK) guide: conducting stakeholder interviews, decomposing business problems, and drafting Business Requirement Documents (BRD).",
    type: "ARTICLE",
    provider: "International Institute of Business Analysis (IIBA)",
    sourceUrl: "https://www.iiba.org/standards-and-resources/babok/",
    domainIds: ["mgmt"],
    roleIds: ["Business Analyst"],
    moduleIds: ["step-ba-req"],
    skillIds: ["Requirements Engineering", "BRD Documentation"],
    difficulty: "Beginner",
    duration: "50 mins",
    accessType: "Official Guide Summary",
    license: "IIBA Educational Reference",
    learningObjectives: [
      "Distinguish between Business, Stakeholder, Functional, and Non-Functional Requirements.",
      "Conduct structured elicitation workshops using active listening and 5-Whys root cause analysis.",
      "Structure a professional Business Requirements Document (BRD) and Functional Specification Document (FSD)."
    ],
    keyTakeaways: [
      "Requirements must be unambiguous, testable, traceable, prioritized, and complete.",
      "Non-functional requirements specify system qualities: latency, uptime, security, and scalability.",
      "Traceability matrices map business objectives through user stories to automated test cases."
    ],
    content: `### BABOK v3 Requirements Engineering Architecture

The International Institute of Business Analysis (IIBA) defines requirements across four distinct hierarchical layers:

1. **Business Requirements**: High-level corporate goals and financial objectives (e.g. 'Reduce customer onboarding churn by 18% in FY27').
2. **Stakeholder Requirements**: Needs of specific user groups (e.g. 'Compliance officers must be able to flag suspicious transactions within 2 hours').
3. **Solution Requirements**:
   * **Functional Requirements**: Behaviors, features, and capabilities the system must execute.
   * **Non-Functional Requirements (NFRs)**: Performance benchmarks, security standards, reliability, and concurrency limits.
4. **Transition Requirements**: Temporary capabilities needed to migrate data, train personnel, or maintain dual-run states during deployment.`
  },
  {
    id: "res-ba-req-2",
    title: "BPMN 2.0 Process Modeling & Workflow Optimization",
    description: "Standard notation for business process modeling: pools, lanes, sequence flows, gateway logic (exclusive XOR, parallel AND, inclusive OR), and event triggers.",
    type: "PDF",
    provider: "Object Management Group (OMG) / Camunda",
    sourceUrl: "https://www.omg.org/spec/BPMN/2.0/",
    domainIds: ["mgmt"],
    roleIds: ["Business Analyst"],
    moduleIds: ["step-ba-bpmn"],
    skillIds: ["BPMN", "Process Mapping"],
    difficulty: "Intermediate",
    duration: "1 hour",
    accessType: "Open Technical Standard",
    license: "OMG Open Specification",
    learningObjectives: [
      "Construct syntactically valid BPMN 2.0 process flow diagrams using standard symbols.",
      "Apply XOR, AND, and inclusive OR decision gateways accurately to eliminate process deadlocks.",
      "Model As-Is versus To-Be enterprise workflows to identify process bottlenecks."
    ],
    keyTakeaways: [
      "Pools represent distinct organizational entities; Swimlanes represent roles within an organization.",
      "Sequence flows cannot cross pool boundaries; message flows must be used for inter-organizational communication.",
      "Gateways evaluate conditions but do not execute work themselves."
    ],
    content: `### BPMN 2.0 Notation Core Components

Business Process Model and Notation (BPMN) is the global graphical standard for business workflows:

* **Flow Objects**:
  * **Events**: Small circles denoting starting triggers (thin border), intermediate checkpoints (double border), and terminal states (bold border).
  * **Activities**: Rounded rectangles indicating tasks or sub-processes performed by actors or automated scripts.
  * **Gateways**: Diamonds controlling divergence and convergence of sequence flows.
* **Connecting Objects**:
  * **Sequence Flow (Solid Arrow)**: Defines the chronological path of execution within a pool.
  * **Message Flow (Dashed Arrow)**: Represents information signals exchanged between separate pools.
  * **Association (Dotted Line)**: Links text annotations or data objects to activities.`
  },
  {
    id: "res-ba-req-3",
    title: "Interactive Workshop: Writing INVEST-Compliant Agile User Stories & Gherkin Criteria",
    description: "Hands-on writing lab: translate client needs into user stories ('As a... I want... So that...') with Gherkin acceptance criteria ('Given... When... Then...').",
    type: "PRACTICE",
    provider: "Agile Alliance / SkillBridge Product Lab",
    sourceUrl: "https://www.agilealliance.org/glossary/user-story/",
    domainIds: ["mgmt"],
    roleIds: ["Business Analyst"],
    moduleIds: ["step-ba-req"],
    skillIds: ["Agile Requirements", "User Stories"],
    difficulty: "Intermediate",
    duration: "1.5 hours",
    accessType: "Free",
    license: "Creative Commons Attribution",
    learningObjectives: [
      "Apply the INVEST mnemonic: Independent, Negotiable, Valuable, Estimable, Small, Testable.",
      "Author executable acceptance criteria using Behavior-Driven Development (BDD) Gherkin syntax.",
      "Decompose large product epics into sprint-sized, production-ready user stories."
    ],
    keyTakeaways: [
      "Acceptance criteria define the exact boundary conditions required for story sign-off.",
      "Avoid technical implementation prescriptions in user story titles; focus strictly on user value."
    ],
    content: `### User Story Writing & Gherkin Lab

#### The Standard Story Template:
\`\`\`text
As a [Target User Persona],
I want to [Execute Specific Action / Capability],
So that [Achieve Measurable Business Value].
\`\`\`

#### Gherkin Acceptance Criteria Template:
\`\`\`gherkin
Scenario: Customer submits loan application with complete KYC
  Given the user has uploaded valid Aadhaar and PAN card documents
  And the credit score verification API returns a score >= 720
  When the user clicks the "Submit Application" button
  Then the system displays the "Application Approved" confirmation banner
  And an automated SMS notification is dispatched within 60 seconds
\`\`\``
  },

  // =========================================================================
  // 3. ELECTRONICS & COMMUNICATION — EMBEDDED SYSTEMS ENGINEER
  // =========================================================================

  // Module 1: Embedded C (step-emb-fund)
  {
    id: "res-emb-c-1",
    title: "Low-Level Embedded C: Memory-Mapped I/O, Bitwise Manipulation & Pointers",
    description: "Direct bare-metal programming on ARM Cortex-M: register manipulation, volatile keyword semantics, bitwise operations for GPIO, and interrupt vector tables.",
    type: "ARTICLE",
    provider: "Embedded.com / ARM Developer",
    sourceUrl: "https://developer.arm.com/documentation/",
    domainIds: ["ece"],
    roleIds: ["Embedded Systems Engineer"],
    moduleIds: ["step-emb-fund"],
    skillIds: ["Embedded C", "Bitwise Manipulation"],
    difficulty: "Beginner",
    duration: "1 hour",
    accessType: "Official Developer Documentation",
    license: "ARM Community Open Access",
    learningObjectives: [
      "Manipulate microcontroller peripheral registers using bitwise operators (&, |, ^, ~, <<, >>).",
      "Explain the critical role of the 'volatile' keyword when reading hardware status registers and ISR flags.",
      "Configure GPIO Direction and Output registers on bare-metal ARM Cortex architectures."
    ],
    keyTakeaways: [
      "The 'volatile' keyword prevents the compiler optimizer from caching hardware register values in CPU registers.",
      "Always use bitmasks rather than directly overwriting entire 32-bit peripheral configuration registers.",
      "Pointer arithmetic on hardware-mapped addresses must align with microcontroller peripheral memory maps."
    ],
    content: `### Embedded C Register Architecture

Bare-metal programming interacts directly with hardware registers mapped to specific RAM address ranges:

\`\`\`c
// Define GPIO Port A base address and registers
#define GPIOA_BASE   (0x40020000UL)
#define GPIOA_MODER  (*(volatile uint32_t *)(GPIOA_BASE + 0x00))
#define GPIOA_ODR    (*(volatile uint32_t *)(GPIOA_BASE + 0x14))

void gpio_pin5_init(void) {
    // Enable GPIOA clock in RCC bus register
    // Set Pin 5 to General Purpose Output mode (01 in bits 11:10)
    GPIOA_MODER &= ~(0x3UL << (5 * 2)); // Clear bits
    GPIOA_MODER |=  (0x1UL << (5 * 2)); // Set bit 10 to 1
}

void gpio_pin5_toggle(void) {
    GPIOA_ODR ^= (1UL << 5); // Toggle Pin 5 state
}
\`\`\`

#### Why \`volatile\` is Non-Negotiable:
If a register value can change outside the awareness of the compiler (e.g. by hardware peripherals or an Interrupt Service Routine), the compiler must reload the value from memory on every read rather than optimizing it away.`
  },
  {
    id: "res-emb-c-2",
    title: "Hardware Serial Bus Protocols: UART, SPI, and I2C Deep Dive",
    description: "Physical layer and timing diagrams for UART (asynchronous), SPI (full-duplex master-slave), and I2C (two-wire open-drain with pull-ups and clock stretching).",
    type: "DOCUMENTATION",
    provider: "Texas Instruments / SparkFun Electronics",
    sourceUrl: "https://www.ti.com/lit/an/slaa328/slaa328.pdf",
    domainIds: ["ece"],
    roleIds: ["Embedded Systems Engineer"],
    moduleIds: ["step-emb-fund"],
    skillIds: ["Serial Communication", "UART", "SPI", "I2C"],
    difficulty: "Intermediate",
    duration: "1.2 hours",
    accessType: "Open Technical Guide",
    license: "TI Open Technical Documentation",
    learningObjectives: [
      "Analyze oscilloscope traces for UART, SPI, and I2C communication packets.",
      "Calculate baud rate divisors from system clock frequencies.",
      "Select pull-up resistor values for I2C buses based on bus capacitance and data rates."
    ],
    keyTakeaways: [
      "UART requires matching baud rate, parity, and stop bit configurations on both transmitter and receiver.",
      "SPI uses 4 wires (MOSI, MISO, SCK, CS) and offers the highest data throughput of low-speed serial buses.",
      "I2C requires open-drain outputs with external pull-up resistors; supports multi-device addressing on 2 wires."
    ],
    content: `### Serial Protocol Comparison Matrix

| Protocol | Wires | Duplex | Speed | Topology | Addressing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UART** | 2 (TX, RX) | Full | Up to 1 Mbps | Point-to-Point | None (Peer to Peer) |
| **SPI** | 4 (MOSI, MISO, SCK, CS) | Full | Up to 50+ Mbps | Master-Slave | Chip Select line per slave |
| **I2C** | 2 (SDA, SCL) | Half | Up to 3.4 Mbps | Multi-Master Multi-Slave | 7-bit / 10-bit software address |`
  },
  {
    id: "res-emb-c-3",
    title: "FreeRTOS Kernel: Tasks, Queues, Mutexes, and Interrupt Handlers",
    description: "Real-Time Operating System principles for microcontrollers: preemptive multitasking, priority inversion, semaphores, and inter-task communication via queues.",
    type: "BOOK",
    provider: "Real Time Engineers Ltd / FreeRTOS.org",
    sourceUrl: "https://www.freertos.org/Documentation/RTOS_book.html",
    domainIds: ["ece"],
    roleIds: ["Embedded Systems Engineer"],
    moduleIds: ["step-emb-rtos"],
    skillIds: ["RTOS", "FreeRTOS"],
    difficulty: "Advanced",
    duration: "2.5 hours",
    accessType: "Official Open Source Book",
    license: "MIT Open Source License",
    learningObjectives: [
      "Configure FreeRTOS task priorities and explain preemptive scheduling mechanisms.",
      "Safely pass sensor data between tasks using thread-safe FreeRTOS Queues.",
      "Prevent race conditions and priority inversion using Mutexes with Priority Inheritance."
    ],
    keyTakeaways: [
      "Never call blocking FreeRTOS API functions inside an Interrupt Service Routine (ISR); use \`FromISR\` variants.",
      "Task stack overflow is the most common cause of silent microcontroller crashes under RTOS.",
      "Binary semaphores are intended for synchronization; mutexes are intended for mutual exclusion."
    ],
    content: `### FreeRTOS Real-Time Architecture

FreeRTOS provides deterministic real-time scheduling for memory-constrained microcontrollers:

* **Task Scheduling**: The FreeRTOS scheduler selects the highest-priority Ready-state task to execute on every SysTick timer interrupt.
* **Priority Inversion Mitigation**: When a low-priority task holds a mutex required by a high-priority task, FreeRTOS temporarily elevates the low-priority task's priority until the mutex is released.`
  },

  // =========================================================================
  // 4. ELECTRICAL & ELECTRONICS — POWER SYSTEMS ENGINEER
  // =========================================================================

  // Module 1: Circuit Analysis & Power Electronics (step-eee-fund)
  {
    id: "res-eee-circ-1",
    title: "Power System Load Flow: Gauss-Seidel & Newton-Raphson Methods",
    description: "Mathematical formulation of power flow in electrical transmission networks: admittance matrix (Y-bus), active/reactive power mismatches, and Jacobian matrix derivation.",
    type: "ARTICLE",
    provider: "NPTEL / Indian Institute of Technology (IIT) Kharagpur",
    sourceUrl: "https://nptel.ac.in/courses/108105067",
    domainIds: ["eee"],
    roleIds: ["Power Systems Engineer"],
    moduleIds: ["step-eee-fund"],
    skillIds: ["Power Systems", "Load Flow Analysis"],
    difficulty: "Intermediate",
    duration: "1.5 hours",
    accessType: "Open Educational Resource",
    license: "NPTEL Government of India",
    learningObjectives: [
      "Formulate the bus admittance matrix ($Y_{bus}$) using network line impedances.",
      "Classify system buses into Slack (Reference), Generator (PV), and Load (PQ) buses.",
      "Solve nonlinear power flow equations using the Newton-Raphson iterative algorithm."
    ],
    keyTakeaways: [
      "Load flow determines steady-state voltages, angles, active power, and reactive power flows across every substation bus.",
      "Newton-Raphson converges quadratically, outperforming Gauss-Seidel on large utility grid networks.",
      "Reactive power flow is strongly correlated with voltage magnitude differences between interconnected buses."
    ],
    content: `### Power Flow Equations & Jacobian Matrix

In an $N$-bus transmission system, the complex power injected into bus $i$ is:

$$S_i = P_i + jQ_i = V_i I_i^* = V_i \\sum_{k=1}^{N} Y_{ik}^* V_k^*$$

#### Power Inflow Equations:
$$P_i = |V_i| \\sum_{k=1}^{N} |V_k| |Y_{ik}| \\cos(\\theta_{ik} + \\delta_k - \\delta_i)$$
$$Q_i = -|V_i| \\sum_{k=1}^{N} |V_k| |Y_{ik}| \\sin(\\theta_{ik} + \\delta_k - \\delta_i)$$

#### Newton-Raphson Iterative Formulation:
$$\\begin{bmatrix} \\Delta P \\\\ \\Delta Q \\end{bmatrix} = \\begin{bmatrix} J_{11} & J_{12} \\\\ J_{21} & J_{22} \\end{bmatrix} \\begin{bmatrix} \\Delta \\delta \\\\ \\Delta |V| / |V| \\end{bmatrix}$$`
  },
  {
    id: "res-eee-circ-2",
    title: "Power Electronics: Inverters, DC-DC Converters & Grid Synchronization",
    description: "Design and control of power electronics for renewable energy: Pulse Width Modulation (PWM), Buck/Boost topologies, and Phase-Locked Loop (PLL) grid synchronization.",
    type: "DOCUMENTATION",
    provider: "IEEE Power Electronics Society / NREL",
    sourceUrl: "https://www.nrel.gov/grid/grid-forming-inverters.html",
    domainIds: ["eee"],
    roleIds: ["Power Systems Engineer"],
    moduleIds: ["step-eee-solar"],
    skillIds: ["Power Electronics", "Renewable Integration"],
    difficulty: "Advanced",
    duration: "2 hours",
    accessType: "Open Technical Report",
    license: "NREL Public Domain",
    learningObjectives: [
      "Analyze topology differences between Buck, Boost, and full-bridge inverter converters.",
      "Apply Space Vector Pulse Width Modulation (SVPWM) to minimize total harmonic distortion (THD).",
      "Model Phase-Locked Loop (PLL) algorithms to lock solar inverters to 50 Hz utility grids."
    ],
    keyTakeaways: [
      "Grid-forming inverters provide synthetic inertia to renewable power grids lacking spinning generator mass.",
      "Harmonic distortion must remain below 5% per IEEE 519 standards to prevent transformer overheating."
    ],
    content: `### Grid-Tied Inverter Topology & Harmonics

Modern renewable generation interfaces with utility grids via three-phase voltage source inverters (VSI):

* **DC Bus Filtering**: Large capacitor banks suppress DC voltage ripples from photovoltaic strings or wind rectification.
* **LCL Filter**: High-order passive filter attenuating high-frequency switching harmonics generated by IGBT/SiC MOSFET switching.
* **Grid-Forming vs Grid-Following**: Grid-following inverters inject current synchronous with grid voltage; grid-forming inverters establish their own voltage reference and frequency.`
  },

  // =========================================================================
  // 5. MECHANICAL ENGINEERING — MECHANICAL DESIGN ENGINEER
  // =========================================================================

  // Module 1: CAD & SolidWorks (step-mech-cad)
  {
    id: "res-mech-cad-1",
    title: "Geometric Dimensioning & Tolerancing (GD&T) per ASME Y14.5 Standards",
    description: "Comprehensive mechanical drawing standard: datum reference frames, position tolerancing, flatness, perpendicularity, runout, and Maximum Material Condition (MMC).",
    type: "ARTICLE",
    provider: "American Society of Mechanical Engineers (ASME) / MIT OCW",
    sourceUrl: "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/",
    domainIds: ["mech"],
    roleIds: ["Mechanical Design Engineer"],
    moduleIds: ["step-mech-cad"],
    skillIds: ["CAD", "GD&T"],
    difficulty: "Intermediate",
    duration: "1 hour",
    accessType: "Open Academic Courseware",
    license: "MIT Creative Commons",
    learningObjectives: [
      "Interpret feature control frames specifying geometric tolerance zones.",
      "Establish primary, secondary, and tertiary datums on machined components.",
      "Calculate bonus tolerances available under Maximum Material Condition (MMC) modifiers."
    ],
    keyTakeaways: [
      "GD&T guarantees functional assembly of mating parts while minimizing manufacturing scrap costs.",
      "The position symbol (circle with crosshairs) controls location, orientation, and form simultaneously.",
      "MMC allows manufacturing tolerances to loosen as hole diameters expand toward their upper limit."
    ],
    content: `### ASME Y14.5 GD&T Architecture

Geometric Dimensioning and Tolerancing provides a standardized engineering language communicating how parts interface:

#### Feature Control Frame Anatomy:
\`\`\`text
[ Position (⌖) | Ø 0.25 (M) | Datum A | Datum B | Datum C ]
   Geometric       Tolerance     Primary   Secondary  Tertiary
   Characteristic    Zone & MMC    Datum     Datum      Datum
\`\`\`

#### Core GD&T Control Categories:
* **Form**: Flatness, Straightness, Circularity, Cylindricity (no datum reference allowed).
* **Orientation**: Perpendicularity, Parallelism, Angularity (requires datum reference).
* **Location**: Position, Concentricity, Symmetry.
* **Runout**: Circular Runout and Total Runout on rotating shafts.`
  },
  {
    id: "res-mech-cad-2",
    title: "Finite Element Analysis (FEA): Stress, Strain & Von Mises Yield Criterion",
    description: "Structural finite element simulation principles: mesh generation, boundary conditions, convergence criteria, and evaluating Von Mises stresses against material yield strength.",
    type: "PDF",
    provider: "Autodesk Knowledge Network / NAFEMS",
    sourceUrl: "https://www.autodesk.com/solutions/simulation/fea",
    domainIds: ["mech"],
    roleIds: ["Mechanical Design Engineer"],
    moduleIds: ["step-mech-ansys"],
    skillIds: ["FEA", "Structural Simulation"],
    difficulty: "Advanced",
    duration: "1.5 hours",
    accessType: "Open Guide",
    license: "Educational Reference",
    learningObjectives: [
      "Apply tetrahedral and hexahedral meshing with refinement at stress concentration fillets.",
      "Formulate linear static stiffness matrices $[K]\{u\} = \{F\}$.",
      "Evaluate Factor of Safety (FoS) based on Von Mises stress relative to yield strength."
    ],
    keyTakeaways: [
      "A simulation is only as reliable as its boundary condition constraints; over-constraining produces artificial stress singularities.",
      "Mesh convergence studies verify that calculated stress results are independent of element size."
    ],
    content: `### FEA Mathematical Fundamentals

Linear static finite element simulation solves the global equilibrium equation:

$$\\mathbf{[K]} \\{u\\} = \\{F\\}$$

Where $\\mathbf{[K]}$ is the global stiffness matrix assembled from element stiffness matrices, $\\{u\\}$ is the nodal displacement vector, and $\\{F\\}$ is the external load vector.

#### Von Mises Yield Criterion:
$$\\sigma_v = \\sqrt{\\frac{1}{2} \\left[(\\sigma_1 - \\sigma_2)^2 + (\\sigma_2 - \\sigma_3)^2 + (\\sigma_3 - \\sigma_1)^2\\right]}$$

A ductile metallic component will begin to yield when $\\sigma_v \\ge \\sigma_{\\text{yield}}$. The Factor of Safety is defined as:
$$\\text{FoS} = \\frac{\\sigma_{\\text{yield}}}{\\sigma_{\\text{max, Von Mises}}}$$`
  },

  // =========================================================================
  // 6. CIVIL ENGINEERING — STRUCTURAL ENGINEER
  // =========================================================================

  // Module 1: Structural Analysis & Design (step-civ-rcc)
  {
    id: "res-civ-struct-1",
    title: "Reinforced Concrete Design (IS 456 / ACI 318): Limit State Method",
    description: "Structural design of reinforced concrete beams and columns: limit states of collapse (flexure, shear, torsion) and limit states of serviceability (deflection, cracking).",
    type: "ARTICLE",
    provider: "Bureau of Indian Standards (BIS) / NPTEL Civil",
    sourceUrl: "https://nptel.ac.in/courses/105105105",
    domainIds: ["civil"],
    roleIds: ["Structural Engineer"],
    moduleIds: ["step-civ-rcc"],
    skillIds: ["Structural Analysis", "RCC Design"],
    difficulty: "Intermediate",
    duration: "1.2 hours",
    accessType: "National Educational Resource",
    license: "NPTEL Open Courseware",
    learningObjectives: [
      "Derive the stress block parameters for concrete under ultimate limit state flexure.",
      "Calculate required area of tensile steel ($A_{st}$) for singly and doubly reinforced beam sections.",
      "Design shear stirrups to prevent brittle diagonal tension failures."
    ],
    keyTakeaways: [
      "Limit State Design ensures safety against ultimate failure while guaranteeing performance under working loads.",
      "Under-reinforced sections are mandatory in seismic zones to guarantee ductile warning before failure.",
      "Concrete compressive strength is factored by 1.5, while steel tensile yield strength is factored by 1.15."
    ],
    content: `### Limit State Design Philosophy (IS 456 / ACI 318)

RCC design balances structural safety and serviceability under characteristic dead, live, and environmental loads:

#### Characteristic Design Strengths:
* **Concrete Design Compressive Strength**: $f_{cd} = \\frac{0.67 f_{ck}}{\\gamma_c} = 0.446 f_{ck}$
* **Steel Design Tensile Strength**: $f_{yd} = \\frac{f_y}{\\gamma_s} = 0.87 f_y$

#### Moment of Resistance for Singly Reinforced Balanced Section:
$$M_{u,\\text{lim}} = 0.36 f_{ck} b x_{u,\\text{max}} \\left(d - 0.42 x_{u,\\text{max}}\\right)$$
Where $x_{u,\\text{max}}$ is the limiting depth of the neutral axis governed by ultimate concrete compressive strain (0.0035).`
  },
  {
    id: "res-civ-struct-2",
    title: "BIM Coordination & Revit Modeling for Multi-Storey RCC Structures",
    description: "Building Information Modeling (BIM) workflows: parametric structural modeling in Autodesk Revit, clash detection with MEP systems, and structural framing schedules.",
    type: "DOCUMENTATION",
    provider: "Autodesk Knowledge Network / BuildingSMART",
    sourceUrl: "https://www.autodesk.com/solutions/bim",
    domainIds: ["civil"],
    roleIds: ["Structural Engineer"],
    moduleIds: ["step-civ-bim"],
    skillIds: ["BIM", "Revit Modeling"],
    difficulty: "Intermediate",
    duration: "1.5 hours",
    accessType: "Official Guide",
    license: "Educational Reference",
    learningObjectives: [
      "Develop 3D parametric structural grids, footings, columns, beams, and slabs in BIM software.",
      "Conduct automated geometric clash tests between structural frames and MEP HVAC ducts in Navisworks.",
      "Generate automated material takeoff schedules for rebar, concrete volume, and formwork area."
    ],
    keyTakeaways: [
      "BIM facilitates Level of Development (LOD 100 to LOD 400) collaboration across architecture and engineering disciplines.",
      "Clash detection resolves cross-disciplinary spatial conflicts before physical construction begins on site."
    ],
    content: `### BIM Structural Lifecycle Integration

Building Information Modeling (BIM) transcends traditional 2D drafting by embedding physical and performance parameters into every structural element:

* **Parametric Families**: Structural elements maintain relational rules (e.g. beam depths dynamically adjust to span ratios).
* **LOD Standards**:
  * **LOD 200**: Approximate quantity, size, shape, and location.
  * **LOD 300**: Specific assemblies with precise dimensions and spatial orientation.
  * **LOD 350**: Detailed connection geometry with rebar clearance and mounting plates.`
  },

  // =========================================================================
  // 7. COMPUTER SCIENCE & IT — SOFTWARE ENGINEER
  // =========================================================================

  // Module 1: Full-Stack Architecture (step-swe-backend)
  {
    id: "res-swe-stack-1",
    title: "Modern Full-Stack Architecture: RESTful APIs, Node.js & React Integration",
    description: "Production architectural principles: REST constraints, stateless JWT authentication, React component lifecycle, asynchronous middleware, and relational schema design.",
    type: "ARTICLE",
    provider: "Mozilla Developer Network (MDN) / Node.js Foundation",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
    domainIds: ["cs_it"],
    roleIds: ["Software Engineer"],
    moduleIds: ["step-swe-backend"],
    skillIds: ["Full-Stack Web Engineering", "REST APIs"],
    difficulty: "Beginner",
    duration: "1 hour",
    accessType: "Open Technical Documentation",
    license: "CC0 Public Domain",
    learningObjectives: [
      "Design idempotent REST endpoints adhering to standard HTTP verb semantics (GET, POST, PUT, DELETE).",
      "Implement secure JWT access token verification middleware in Express.js.",
      "Manage shared frontend application state with React hooks and centralized context."
    ],
    keyTakeaways: [
      "REST APIs must remain stateless; each client request contains all credentials and context needed for processing.",
      "Input validation and sanitization must occur server-side; client validation is strictly a UX convenience."
    ],
    content: `### Production Full-Stack Architecture

A decoupled web architecture separates user interface concerns from backend persistence:

\`\`\`javascript
// Express.js REST Route with Authentication Middleware
import express from 'express';
import { verifyJwt } from '../middleware/auth.js';
import { db } from '../db.js';

const router = express.Router();

router.get('/api/projects/:id', verifyJwt, async (req, res) => {
  try {
    const project = await db.project.findUnique({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
\`\`\``
  },
  {
    id: "res-swe-stack-2",
    title: "System Design Fundamentals: Scalability, Caching & Database Sharding",
    description: "High-scale backend engineering: horizontal vs vertical scaling, Redis caching strategies (Cache-Aside, Write-Through), microservices, and database replication.",
    type: "BOOK",
    provider: "System Design Primer / MIT EECS",
    sourceUrl: "https://github.com/donnemartin/system-design-primer",
    domainIds: ["cs_it"],
    roleIds: ["Software Engineer"],
    moduleIds: ["step-swe-sys"],
    skillIds: ["System Design", "Scalability"],
    difficulty: "Advanced",
    duration: "2 hours",
    accessType: "Open Source Guide",
    license: "Open Source Attribution",
    learningObjectives: [
      "Design fault-tolerant architectures utilizing load balancers (Nginx/HAProxy) and reverse proxies.",
      "Evaluate CAP Theorem trade-offs (Consistency, Availability, Partition Tolerance) for distributed databases.",
      "Implement Redis caching to reduce database read load and latency on hotspot endpoints."
    ],
    keyTakeaways: [
      "Always design for horizontal scalability over vertical hardware upgrades.",
      "Cache invalidation and naming conventions are the two hardest problems in distributed systems.",
      "Read replicas offload heavy analytical and reporting queries from the primary write database."
    ],
    content: `### Scalability Architecture Matrix

* **Load Balancing**: Distributes incoming traffic across redundant application instances using round-robin or least-connections algorithms.
* **Caching Layers**: Redis in-memory key-value stores cache pre-computed query results with explicit Time-To-Live (TTL) expiration.
* **Database Partitioning**: Horizontal sharding splits database rows across multiple machines based on a shard key (e.g. \`tenant_id\` or \`user_id\`).`
  },

  // =========================================================================
  // 8. COMPUTER SCIENCE & IT — DATA ANALYST
  // =========================================================================

  // Module 1: Advanced SQL (step-adv-sql & advanced-sql)
  {
    id: "res-da-sql-1",
    title: "Advanced SQL: Window Functions, CTEs & Query Plan Optimization",
    description: "Master analytical SQL queries: ROW_NUMBER, RANK, DENSE_RANK, cumulative aggregations with OVER(PARTITION BY), recursive CTEs, and index scan optimization.",
    type: "ARTICLE",
    provider: "PostgreSQL Global Development Group",
    sourceUrl: "https://www.postgresql.org/docs/current/tutorial-window.html",
    domainIds: ["cs_it"],
    roleIds: ["Data Analyst"],
    moduleIds: ["step-adv-sql", "advanced-sql"],
    skillIds: ["SQL", "Window Functions"],
    difficulty: "Intermediate",
    duration: "1.2 hours",
    accessType: "Official Documentation",
    license: "PostgreSQL License",
    learningObjectives: [
      "Construct analytical queries using ROW_NUMBER, RANK, and DENSE_RANK window functions.",
      "Calculate rolling 30-day moving averages using \`ROWS BETWEEN 29 PRECEDING AND CURRENT ROW\`.",
      "Analyze EXPLAIN ANALYZE execution plans to diagnose sequential table scans and optimize indexes."
    ],
    keyTakeaways: [
      "Window functions perform analytical calculations across a set of table rows that are related to the current row without collapsing rows like GROUP BY.",
      "Common Table Expressions (CTEs) improve readability and enable recursive tree traversals in relational databases.",
      "B-Tree indexes speed up equality and range searches on filtered columns."
    ],
    content: `### Window Function Architecture in PostgreSQL

Window functions execute calculations across a set of rows while preserving each individual row's distinct identity:

\`\`\`sql
-- Calculate employee salary percentile rank within department
SELECT 
  employee_id,
  department_id,
  salary,
  RANK() OVER (
    PARTITION BY department_id 
    ORDER BY salary DESC
  ) AS dept_salary_rank,
  ROUND(AVG(salary) OVER (
    PARTITION BY department_id
  ), 2) AS dept_avg_salary
FROM employees;
\`\`\`

#### Difference between RANK and DENSE_RANK:
* \`RANK()\` leaves gaps in ranking values when ties occur (e.g. 1, 2, 2, 4).
* \`DENSE_RANK()\` produces contiguous rank numbers without skipping values (e.g. 1, 2, 2, 3).`
  },
  {
    id: "res-da-sql-2",
    title: "Power BI Desktop: DAX Measures, Star Schema & Data Modeling",
    description: "Enterprise business intelligence architecture: star schema data modeling, CALCULATE function modifiers, row context versus filter context, and dynamic KPI cards.",
    type: "DOCUMENTATION",
    provider: "Microsoft Learn / SQLBI",
    sourceUrl: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand",
    domainIds: ["cs_it"],
    roleIds: ["Data Analyst"],
    moduleIds: ["step-pbi", "power-bi"],
    skillIds: ["Power BI", "DAX", "Data Modeling"],
    difficulty: "Intermediate",
    duration: "1.5 hours",
    accessType: "Official Microsoft Documentation",
    license: "Microsoft Open Documentation",
    learningObjectives: [
      "Design normalized Star Schemas separating Fact tables from Dimension tables.",
      "Write advanced DAX measures utilizing CALCULATE, FILTER, and ALL functions.",
      "Implement time intelligence measures: Year-to-Date (YTD) and Year-over-Year (YoY) growth."
    ],
    keyTakeaways: [
      "Always prefer 1-to-Many relationships flowing from Dimension tables to Fact tables.",
      "CALCULATE is the only DAX function capable of modifying and overriding the active filter context.",
      "Bi-directional cross-filtering introduces ambiguity and should be avoided in enterprise schemas."
    ],
    content: `### Star Schema & DAX Modeling Standards

Enterprise reporting models rely on dimensional modeling principles pioneered by Ralph Kimball:

* **Fact Tables**: Contain quantitative measurements, numerical metrics, and transaction foreign keys (e.g. \`FactSales\` with \`revenue\`, \`quantity\`, \`discount\`).
* **Dimension Tables**: Contain descriptive context used to slice, filter, and group data (e.g. \`DimCustomer\`, \`DimProduct\`, \`DimDate\`).

#### Classic DAX Measure:
\`\`\`dax
YoY Sales Growth = 
VAR CurrentYearSales = [Total Sales]
VAR PreviousYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('DimDate'[Date]))
RETURN
    DIVIDE(CurrentYearSales - PreviousYearSales, PreviousYearSales, 0)
\`\`\``
  },

  {
    "id": "res-fa-lbo-1",
    "title": "LBO Modeling Architecture: Debt Schedules, Waterfalls & Returns (IRR)",
    "description": "Leveraged Buyout mechanics: transaction assumptions, sources & uses of funds, circular debt repayment waterfalls, sponsor IRR, and MoIC analysis.",
    "type": "ARTICLE",
    "provider": "CFA Institute / Wall Street Oasis",
    "sourceUrl": "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/private-equity-valuation",
    "domainIds": [
      "comm"
    ],
    "roleIds": [
      "Financial Analyst"
    ],
    "moduleIds": [
      "step-fin-lbo"
    ],
    "skillIds": [
      "M&A Deal Modeling",
      "LBO Modeling",
      "Debt Schedules"
    ],
    "difficulty": "Advanced",
    "duration": "2 hours",
    "accessType": "Open Technical Guide",
    "license": "Educational Reference",
    "learningObjectives": [
      "Construct Sources & Uses tables and calculate goodwill created in buyout transactions.",
      "Model multi-tranche debt amortizations: Senior Term Loans, Mezzanine Debt, and Revolving Credit.",
      "Calculate Sponsor Internal Rate of Return (IRR) and Multiple on Invested Capital (MoIC) across sensitivity cases."
    ],
    "keyTakeaways": [
      "LBO returns depend on EBITDA growth, debt paydown (deleveraging), and multiple expansion.",
      "Cash flow sweeps mandate that excess operating cash be prioritized for mandatory senior debt repayment.",
      "A 20% to 25% IRR benchmark is typically required by institutional private equity investment committees."
    ],
    "content": "### Leveraged Buyout (LBO) Return Mechanics\n\nAn LBO acquires a company using a significant portion of borrowed funds (typically 60%–75% of purchase price), using the target firm's cash flows to service debt:\n\n#### 1. Sources & Uses Framework:\n* **Uses**: Enterprise Value + Refinancing Existing Debt + Advisory/Financing Fees.\n* **Sources**: Senior Bank Debt + Subordinated Mezzanine Notes + Sponsor Equity Check.\n\n#### 2. Returns Drivers:\n$$\\text{MoIC} = \\frac{\\text{Total Cash Inflows at Exit}}{\\text{Initial Sponsor Equity Inflow}}$$\n$$\\text{IRR} = (\\text{MoIC})^{1/t} - 1$$\n\nWhere $t$ is the holding period in years (typically 3–7 years)."
  },

  {
    "id": "res-fa-capstone-1",
    "title": "Institutional Corporate Valuation & Equity Research Memo Capstone",
    "description": "Capstone project: synthesize 3-statement model, multi-scenario DCF, and trading multiples for a publicly traded corporation into a Wall Street-style equity research report.",
    "type": "PROJECT",
    "provider": "SkillBridge Finance Capstone Lab",
    "sourceUrl": "https://www.nseindia.com/market-data/live-equity-market",
    "domainIds": [
      "comm"
    ],
    "roleIds": [
      "Financial Analyst"
    ],
    "moduleIds": [
      "step-fin-capstone"
    ],
    "skillIds": [
      "Full Investment Banking Package",
      "Equity Research",
      "Financial Modeling"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Collect and normalize historical 10-K / Annual Filings for a real-world enterprise.",
      "Integrate an operational DCF valuation with trading comps and precedent transaction benchmarks.",
      "Author an institutional 10-page equity research initiation memo with Target Price, Investment Thesis, and Risk Factors."
    ],
    "keyTakeaways": [
      "Valuation football field charts benchmark DCF ranges against 52-week trading ranges and transaction comps.",
      "Investment theses must identify company catalysts, competitive moats, and margin inflections.",
      "A verified equity research memo is the premier portfolio piece on your Digital Skill Passport."
    ],
    "content": "### Capstone Project: Equity Research Report & Valuation Package\n\n**Deliverable Requirements**:\n1. Dynamic multi-tab Excel financial model (.xlsx) featuring dynamic scenario selector (Base, Bull, Bear).\n2. Institutional Valuation Football Field chart comparing DCF, Comps, and 52-week stock prices.\n3. 10-page Initiation of Coverage memo featuring Investment Rating (Buy/Hold/Sell) and Target Price calculation."
  },

  {
    "id": "res-ba-sql-1",
    "title": "SQL & Relational Analytics for Business Insights & KPI Dashboards",
    "description": "Business-focused SQL: customer cohort analysis, churn rate calculations, multi-table joins, aggregations, and business metrics extraction.",
    "type": "ARTICLE",
    "provider": "Mode Analytics / DataCamp",
    "sourceUrl": "https://mode.com/sql-tutorial/",
    "domainIds": [
      "mgmt"
    ],
    "roleIds": [
      "Business Analyst"
    ],
    "moduleIds": [
      "step-ba-sql"
    ],
    "skillIds": [
      "SQL Querying & KPIs",
      "Business Analytics"
    ],
    "difficulty": "Intermediate",
    "duration": "1.5 hours",
    "accessType": "Open Access",
    "license": "Educational Attribution",
    "learningObjectives": [
      "Extract customer acquisition cost (CAC), monthly recurring revenue (MRR), and churn rates using SQL.",
      "Write multi-table relational joins connecting transactional tables to customer demographic dimensions.",
      "Aggregate and filter temporal time-series business data for executive reporting."
    ],
    "keyTakeaways": [
      "Business analysis SQL prioritizes data accuracy, business KPI correctness, and reproducible queries.",
      "Cohort analysis reveals retention trends over customer lifecycle months.",
      "Self-documenting SQL queries with clear aliases improve cross-functional collaboration."
    ],
    "content": "### SQL for Business Decision Making\n\nBusiness Analysts query transactional databases to answer critical strategic questions:\n\n```sql\n-- Calculate Monthly Recurring Revenue (MRR) and Net Retention\nSELECT \n  DATE_TRUNC('month', transaction_date) AS billing_month,\n  plan_tier,\n  COUNT(DISTINCT customer_id) AS active_subscribers,\n  SUM(billed_amount) AS total_mrr\nFROM subscription_transactions\nWHERE payment_status = 'Success'\nGROUP BY 1, 2\nORDER BY 1 DESC;\n```"
  },

  {
    "id": "res-ba-roi-1",
    "title": "Business Case Financial Modeling: Cost-Benefit Analysis & NPV",
    "description": "Drafting corporate business cases: estimating Total Cost of Ownership (TCO), calculating Return on Investment (ROI), Net Present Value (NPV), and internal rate of return.",
    "type": "PDF",
    "provider": "Project Management Institute (PMI) / Harvard Business Review",
    "sourceUrl": "https://www.pmi.org/learning/library/business-case-development-tools-techniques-6228",
    "domainIds": [
      "mgmt"
    ],
    "roleIds": [
      "Business Analyst"
    ],
    "moduleIds": [
      "step-ba-roi"
    ],
    "skillIds": [
      "ROI & Cost-Benefit Models",
      "Business Valuation"
    ],
    "difficulty": "Intermediate",
    "duration": "1 hour",
    "accessType": "Professional Guide",
    "license": "Educational Reference",
    "learningObjectives": [
      "Decompose technology initiative costs into CapEx, OpEx, and change management expenses.",
      "Model quantifiable financial benefits: cost savings, process efficiency hours, and incremental revenue.",
      "Calculate NPV, Payback Period, and Internal Rate of Return (IRR) in Excel."
    ],
    "keyTakeaways": [
      "A compelling business case justifies capital allocation by proving financial return exceeds hurdle rates.",
      "Net Present Value discounts expected project cash flows by the corporate cost of capital.",
      "Payback period reveals the exact timeline required to recoup initial capital investment."
    ],
    "content": "### Business Case Financial Formulation\n\nA financial justification model quantifies the net impact of an enterprise technology program:\n\n$$\\text{NPV} = \\sum_{t=0}^{n} \\frac{\\text{Net Cash Flow}_t}{(1 + r)^t}$$\n$$\\text{ROI} = \\frac{\\text{Total Cumulative Benefits} - \\text{Total Implementation Costs}}{\\text{Total Implementation Costs}} \\times 100\\%$$\n\nWhere $r$ represents the corporate hurdle discount rate (typically 8%–12%)."
  },

  {
    "id": "res-ba-capstone-1",
    "title": "FinTech Digital Transformation BRD & Product Package Capstone",
    "description": "Comprehensive BA capstone: end-to-end Business Requirements Document (BRD), BPMN 2.0 process models, Jira backlog, and 3-year ROI model for a digital onboarding platform.",
    "type": "PROJECT",
    "provider": "SkillBridge BA Lab",
    "sourceUrl": "https://www.iiba.org/",
    "domainIds": [
      "mgmt"
    ],
    "roleIds": [
      "Business Analyst"
    ],
    "moduleIds": [
      "step-ba-capstone"
    ],
    "skillIds": [
      "Full Product & BA Portfolio",
      "BRD Documentation",
      "Agile Backlog"
    ],
    "difficulty": "Advanced",
    "duration": "3.5 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Author an industry-standard 20-page Business Requirements Document (BRD) for a FinTech platform.",
      "Create As-Is and To-Be BPMN swimlane workflows resolving onboarding friction points.",
      "Draft 15 INVEST-compliant user stories with Gherkin acceptance criteria in Jira format."
    ],
    "keyTakeaways": [
      "The BRD connects executive strategic goals with operational engineering delivery specifications.",
      "A complete BA portfolio demonstrates requirements engineering, data modeling, and business case acumen."
    ],
    "content": "### Capstone Project: Digital Transformation BRD Package\n\n**Deliverable Requirements**:\n1. Executive BRD document including Scope, Stakeholder Map, Functional & Non-Functional Requirements.\n2. High-resolution BPMN 2.0 workflow diagram mapping customer identity verification.\n3. Excel Financial Business Case demonstrating NPV and 2.5-year payback on digital onboarding automation."
  },

  {
    "id": "res-emb-arm-1",
    "title": "ARM Cortex-M Hardware Architecture: NVIC, SysTick & Timers",
    "description": "Low-level ARM architecture: Cortex-M register model, Nested Vectored Interrupt Controller (NVIC) configuration, SysTick timers, and peripheral interrupts.",
    "type": "ARTICLE",
    "provider": "ARM Developer / STMicroelectronics",
    "sourceUrl": "https://developer.arm.com/Processors/Cortex-M4",
    "domainIds": [
      "ece"
    ],
    "roleIds": [
      "Embedded Systems Engineer"
    ],
    "moduleIds": [
      "step-emb-arm"
    ],
    "skillIds": [
      "STM32 & NVIC Interrupts",
      "ARM Cortex-M"
    ],
    "difficulty": "Intermediate",
    "duration": "1.5 hours",
    "accessType": "Official Developer Documentation",
    "license": "ARM Open Documentation",
    "learningObjectives": [
      "Configure NVIC priority grouping and sub-priority levels for deterministic interrupt handling.",
      "Implement SysTick timer interrupts to generate precision millisecond system heartbeats.",
      "Configure general-purpose hardware timers (TIM2/TIM3) for PWM and input capture modes."
    ],
    "keyTakeaways": [
      "NVIC features low-latency tail-chaining, reducing interrupt dispatch latency to single-digit CPU cycles.",
      "SysTick is standard across all ARM Cortex-M microcontrollers, enabling portable RTOS timing."
    ],
    "content": "### ARM Cortex-M Interrupt Architecture\n\nThe Nested Vectored Interrupt Controller (NVIC) provides hardware-managed interrupt prioritization:\n\n```c\n// Configure NVIC interrupt priority and enable IRQ for USART2\nNVIC_SetPriority(USART2_IRQn, 2);\nNVIC_EnableIRQ(USART2_IRQn);\n```\n\n* **Tail-Chaining**: Hardware vector switch executing consecutive pending interrupts without full stack save/restore cycles."
  },

  {
    "id": "res-emb-can-1",
    "title": "Automotive CAN Bus Protocol (ISO 11898): Framing, Arbitration & Diagnostics",
    "description": "Automotive network engineering: CAN 2.0B frame structure, differential physical signaling, bitwise arbitration, error counters, and OBD-II diagnostics.",
    "type": "DOCUMENTATION",
    "provider": "Vector Informatik / Bosch",
    "sourceUrl": "https://www.vector.com/int/en/know-how/protocols/can-general-information/",
    "domainIds": [
      "ece"
    ],
    "roleIds": [
      "Embedded Systems Engineer"
    ],
    "moduleIds": [
      "step-emb-can"
    ],
    "skillIds": [
      "CAN 2.0B Protocol",
      "Automotive Diagnostics"
    ],
    "difficulty": "Advanced",
    "duration": "2 hours",
    "accessType": "Technical Standard",
    "license": "Vector Educational Reference",
    "learningObjectives": [
      "Analyze CAN differential physical voltage levels: CAN_H, CAN_L, dominant (0) vs recessive (1).",
      "Explain non-destructive bitwise arbitration based on 11-bit and 29-bit message IDs.",
      "Implement CAN transmission and reception mailboxes on STM32 / bxCAN peripherals."
    ],
    "keyTakeaways": [
      "CAN bus requires 120-ohm termination resistors at both cable ends to eliminate signal reflections.",
      "Lowest numerical message identifier has highest bus priority without packet collision.",
      "Fault confinement isolates corrupt nodes through Error Active, Error Passive, and Bus-Off states."
    ],
    "content": "### Automotive CAN Bus Physical & Data Link Layer\n\nCAN uses two-wire differential signaling (CAN High and CAN Low) to reject common-mode electromagnetic noise:\n\n* **Dominant Bit ('0')**: CAN_H driven to 3.5V, CAN_L driven to 1.5V (Differential = 2.0V).\n* **Recessive Bit ('1')**: Both CAN_H and CAN_L float at 2.5V (Differential = 0.0V)."
  },

  {
    "id": "res-emb-capstone-1",
    "title": "Industrial Telemetry & RTOS Controller Capstone",
    "description": "Embedded capstone project: build an STM32 FreeRTOS telemetry unit capturing sensor inputs, streaming over CAN bus, and logging to an SD card with blackbox reliability.",
    "type": "PROJECT",
    "provider": "SkillBridge Embedded Lab",
    "sourceUrl": "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html",
    "domainIds": [
      "ece"
    ],
    "roleIds": [
      "Embedded Systems Engineer"
    ],
    "moduleIds": [
      "step-emb-capstone"
    ],
    "skillIds": [
      "Full Hardware/Firmware Integration",
      "FreeRTOS",
      "CAN Bus"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Embedded Lab",
    "learningObjectives": [
      "Architect a multi-task FreeRTOS firmware with sensor acquisition, CAN communication, and storage tasks.",
      "Implement thread-safe DMA transfers between SPI peripherals and FreeRTOS message queues.",
      "Validate timing jitter and memory safety using runtime stack watermarking and logic analyzers."
    ],
    "keyTakeaways": [
      "Industrial controllers require watchdog timers and brown-out detection to recover from power anomalies.",
      "A complete embedded portfolio piece with schematics and firmware establishes tier-1 hardware placement readiness."
    ],
    "content": "### Embedded Systems Capstone Deliverables\n\n1. Complete C/C++ firmware repository with modular drivers for GPIO, UART, CAN, and SPI.\n2. Logic analyzer trace captures demonstrating CAN bus packet transmission at 500 kbps.\n3. System architecture design document detailing FreeRTOS task priorities and memory allocation."
  },

  {
    "id": "res-eee-etap-1",
    "title": "Substation Design & ETAP Simulation: Short-Circuit & Relay Coordination",
    "description": "Industrial power system modeling: single line diagrams, IEC 60909 three-phase short-circuit calculations, and overcurrent relay Time-Current Characteristic (TCC) coordination.",
    "type": "DOCUMENTATION",
    "provider": "ETAP / IEEE Industry Applications Society",
    "sourceUrl": "https://etap.com/solutions/substation-design",
    "domainIds": [
      "eee"
    ],
    "roleIds": [
      "Power Systems Engineer"
    ],
    "moduleIds": [
      "step-eee-etap"
    ],
    "skillIds": [
      "ETAP Grid Simulation",
      "Substation Design"
    ],
    "difficulty": "Intermediate",
    "duration": "2 hours",
    "accessType": "Professional Simulation Guide",
    "license": "Educational Reference",
    "learningObjectives": [
      "Build a 33kV/11kV substation single line diagram with transformers, breakers, and busbars in ETAP.",
      "Execute IEC 60909 short-circuit simulations to determine peak withstand currents for switchgear rating.",
      "Coordinate upstream and downstream protective relay curves to achieve discriminating trip times."
    ],
    "keyTakeaways": [
      "ETAP simulations ensure circuit breakers can clear maximum prospective short-circuit fault currents.",
      "Discrimination time margin (typically 200–300 ms) ensures only the breaker closest to the fault trips."
    ],
    "content": "### ETAP Substation Protection Architecture\n\nPower system security relies on selective coordination of numerical relays across voltage tiers:\n\n* **Short-Circuit Calculation (IEC 60909)**: Determines initial symmetrical short-circuit current ($I_k''$) and peak short-circuit current ($i_p$).\n* **Relay Time-Current Curves (TCC)**: Plot inverse-time overcurrent characteristics ($t = \\frac{k}{(I/I_s)^\\alpha - 1}$) ensuring downstream faults isolate before upstream mains disconnect."
  },

  {
    "id": "res-eee-protection-1",
    "title": "Microprocessor Numerical Protection Relaying & IEC 61850 Standards",
    "description": "Modern digital substation protection: differential protection (87), distance/mho relays (21), breaker failure (50BF), and IEC 61850 GOOSE messaging.",
    "type": "ARTICLE",
    "provider": "NPTEL / Schweitzer Engineering Laboratories (SEL)",
    "sourceUrl": "https://selinc.com/solutions/protection/",
    "domainIds": [
      "eee"
    ],
    "roleIds": [
      "Power Systems Engineer"
    ],
    "moduleIds": [
      "step-eee-protection"
    ],
    "skillIds": [
      "Substation Automation",
      "Numerical Protection Relays"
    ],
    "difficulty": "Advanced",
    "duration": "1.5 hours",
    "accessType": "Open Educational Resource",
    "license": "NPTEL Government of India",
    "learningObjectives": [
      "Explain percentage biased differential protection for power transformers to prevent false trips during inrush.",
      "Configure mho impedance zones for transmission line distance protection (Zone 1 80%, Zone 2 120%).",
      "Evaluate IEC 61850 substation automation architecture: Station Bus, Process Bus, and GOOSE messaging."
    ],
    "keyTakeaways": [
      "Harmonic restraint (2nd harmonic) blocks differential relay operation during transformer core energization.",
      "IEC 61850 GOOSE messages deliver sub-4ms trip signals over fiber-optic Ethernet, replacing copper wiring."
    ],
    "content": "### Numerical Protection & Transformer Differential (87T)\n\nTransformer differential protection compares currents entering and leaving the protected winding zone:\n\n$$I_{\\text{diff}} = |\\vec{I}_1 + \\vec{I}_2|$$\n$$I_{\\text{restraint}} = \\frac{|\\vec{I}_1| + |\\vec{I}_2|}{2}$$\n\nA trip signal is issued when $I_{\\text{diff}} > K \\times I_{\\text{restraint}} + I_0$, protecting against internal turn-to-turn winding faults."
  },

  {
    "id": "res-eee-capstone-1",
    "title": "Grid-Connected Hybrid Solar-Battery Microgrid Capstone",
    "description": "Electrical capstone: design and simulate a 1MW grid-tied industrial microgrid with photovoltaic generation, battery energy storage (BESS), and seamless islanding in MATLAB/Simulink.",
    "type": "PROJECT",
    "provider": "SkillBridge Power Systems Lab",
    "sourceUrl": "https://www.mathworks.com/solutions/energy-production.html",
    "domainIds": [
      "eee"
    ],
    "roleIds": [
      "Power Systems Engineer"
    ],
    "moduleIds": [
      "step-eee-capstone"
    ],
    "skillIds": [
      "Comprehensive System Design",
      "Microgrid Simulation",
      "MATLAB Simulink"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Simulate a 1 MW solar PV array with Perturb & Observe MPPT control in MATLAB/Simulink.",
      "Design bidirectional DC-DC buck-boost converter controllers for lithium-ion BESS charging.",
      "Implement zero-crossing phase-locked loop (PLL) control for seamless microgrid islanding and reconnection."
    ],
    "keyTakeaways": [
      "Grid-connected microgrids enhance reliability while reducing peak demand charges for industrial facilities.",
      "Verified microgrid simulation portfolios demonstrate elite renewable engineering qualifications."
    ],
    "content": "### Microgrid Capstone Package Deliverables\n\n1. Complete MATLAB / Simulink model file (.slx) containing PV array, BESS, inverter, and local industrial load.\n2. Waveform analysis report demonstrating voltage stability during sudden utility grid detachment (islanding).\n3. Single line diagram and protective relay coordination schedule in compliance with IEEE 1547 standards."
  },

  {
    "id": "res-mech-dfm-1",
    "title": "Design for Manufacturing & Assembly (DFM / DFA) for Plastic & Cast Metals",
    "description": "Production engineering standards: plastic injection mold draft angles, wall thickness uniformity, sink mark prevention, die casting tolerances, and assembly fastener reduction.",
    "type": "ARTICLE",
    "provider": "Society of Manufacturing Engineers (SME) / MIT OCW",
    "sourceUrl": "https://ocw.mit.edu/courses/2-008-design-and-manufacturing-ii-spring-2004/",
    "domainIds": [
      "mech"
    ],
    "roleIds": [
      "Mechanical Design Engineer"
    ],
    "moduleIds": [
      "step-mech-dfm"
    ],
    "skillIds": [
      "Tooling & Injection Molding",
      "DFM/DFA"
    ],
    "difficulty": "Intermediate",
    "duration": "1.5 hours",
    "accessType": "Open Academic Courseware",
    "license": "MIT Creative Commons",
    "learningObjectives": [
      "Apply minimum draft angles (1° to 3°) and parting line locations for injection molded enclosures.",
      "Design internal coring and rib structures to maintain nominal wall thickness and avoid sink marks.",
      "Implement Boothroyd-Dewhurst DFA principles to minimize component count and manual assembly time."
    ],
    "keyTakeaways": [
      "Uniform wall thickness prevents differential cooling rates that produce part warpage and internal stress.",
      "Eliminating threaded fasteners with snap-fits cuts assembly labor cost significantly.",
      "DFM reviews before tooling commitment prevent expensive steel-safe tooling redesigns."
    ],
    "content": "### Principles of Design for Manufacturing (DFM)\n\nSuccessful product realization balances geometric functionality with manufacturing feasibility:\n\n* **Nominal Wall Thickness**: Maintain uniform walls; transitions should use gradual fillets rather than sharp steps.\n* **Draft Angles**: Include 0.5° per side minimum for polished cores, 1°–2° for cavity sides, and 3°+ for textured finishes.\n* **Rib Design**: Rib thickness should not exceed 40%–60% of the adjacent nominal wall thickness to prevent visible surface sink marks."
  },

  {
    "id": "res-mech-fatigue-1",
    "title": "Fatigue Analysis & Durability Optimization: S-N Curves & Miner's Rule",
    "description": "Mechanical durability engineering: high-cycle fatigue, Wöhler S-N curve modeling, stress life vs strain life, Goodman mean stress correction, and cumulative damage prediction.",
    "type": "DOCUMENTATION",
    "provider": "ASME / NAFEMS International",
    "sourceUrl": "https://www.asme.org/codes-standards",
    "domainIds": [
      "mech"
    ],
    "roleIds": [
      "Mechanical Design Engineer"
    ],
    "moduleIds": [
      "step-mech-fatigue"
    ],
    "skillIds": [
      "Life Cycle & Thermal",
      "Fatigue Analysis"
    ],
    "difficulty": "Advanced",
    "duration": "2 hours",
    "accessType": "Open Technical Guide",
    "license": "Educational Reference",
    "learningObjectives": [
      "Construct high-cycle fatigue S-N curves accounting for surface finish, size factor, and reliability modifiers.",
      "Apply Modified Goodman and Gerber mean stress corrections to alternating stress components.",
      "Calculate total cumulative fatigue damage across cyclic spectrum loading using Miner's linear damage rule."
    ],
    "keyTakeaways": [
      "Over 80% of mechanical engineering component failures in service are caused by cyclic fatigue.",
      "Ferrous steels exhibit an endurance limit below which infinite fatigue life is theoretically possible.",
      "Stress concentration notches (fillets, holes) drastically reduce fatigue life compared to static yield strength."
    ],
    "content": "### Fatigue Life Calculation & Modified Goodman Criterion\n\nCyclic stress consists of an alternating component ($\\sigma_a$) and a mean component ($\\sigma_m$):\n\n$$\\sigma_a = \\frac{\\sigma_{\\text{max}} - \\sigma_{\\text{min}}}{2}, \\quad \\sigma_m = \\frac{\\sigma_{\\text{max}} + \\sigma_{\\text{min}}}{2}$$\n\n#### Modified Goodman Equation:\n$$\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{n}$$\nWhere $S_e$ is the endurance limit, $S_{ut}$ is the ultimate tensile strength, and $n$ is the fatigue factor of safety."
  },

  {
    "id": "res-mech-capstone-1",
    "title": "Automotive Suspension Knuckle Design & Optimization Capstone",
    "description": "Mechanical design capstone: model a forged aluminum steering knuckle in SolidWorks, conduct topology optimization in ANSYS, and generate ASME Y14.5 manufacturing drawings.",
    "type": "PROJECT",
    "provider": "SkillBridge Mechanical Lab",
    "sourceUrl": "https://www.sae.org/",
    "domainIds": [
      "mech"
    ],
    "roleIds": [
      "Mechanical Design Engineer"
    ],
    "moduleIds": [
      "step-mech-capstone"
    ],
    "skillIds": [
      "Full Design-to-Simulation Package",
      "CAD",
      "FEA Optimization"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Calculate 3G bump, 1.5G braking, and 1.5G cornering loads on automotive upright knuckles.",
      "Perform topology optimization in ANSYS to remove 25%+ redundant material while preserving structural stiffness.",
      "Produce production-ready 2D GD&T manufacturing drawings with feature control frames and datum structures."
    ],
    "keyTakeaways": [
      "Unsprung mass reduction directly improves vehicle handling response and suspension dynamics.",
      "A complete CAD-to-FEA automotive package demonstrates OEM-level engineering readiness on your Skill Passport."
    ],
    "content": "### Steering Knuckle Capstone Package Deliverables\n\n1. Fully parametric 3D CAD model (.step / .sldprt) incorporating verified bearing and caliper mounting interfaces.\n2. Complete ANSYS structural report verifying maximum Von Mises stress remains below material yield under 3G bump loading.\n3. ASME Y14.5 compliant 2D engineering drawing (.pdf) detailing datum scheme and position tolerances."
  },

  {
    "id": "res-civ-etabs-1",
    "title": "Multi-Storey Structural Analysis in ETABS: Seismic Response Spectrum",
    "description": "High-rise building engineering: 3D reinforced concrete frame modeling, diaphragm constraints, wind loads (IS 875 Part 3), and response spectrum earthquake analysis (IS 1893:2016).",
    "type": "ARTICLE",
    "provider": "Computers and Structures, Inc. (CSI) / NPTEL",
    "sourceUrl": "https://www.csiamerica.com/products/etabs",
    "domainIds": [
      "civil"
    ],
    "roleIds": [
      "Structural Engineer"
    ],
    "moduleIds": [
      "step-civ-etabs"
    ],
    "skillIds": [
      "ETABS 3D Analysis",
      "Seismic Engineering"
    ],
    "difficulty": "Intermediate",
    "duration": "2 hours",
    "accessType": "Educational Guide",
    "license": "NPTEL Civil",
    "learningObjectives": [
      "Model 3D spatial beams, columns, and shear walls with semi-rigid floor diaphragms in ETABS.",
      "Calculate fundamental natural periods and modal mass participation factors (minimum 90% per IS 1893).",
      "Evaluate inter-storey drift limits to guarantee lateral stability under seismic base shear."
    ],
    "keyTakeaways": [
      "Response Spectrum analysis evaluates dynamic building vibration modes excited by earthquake ground motions.",
      "Shear walls placed near building peripheries drastically reduce torsional irregularity and drift.",
      "Soft storey and mass irregularities must be identified and reinforced per modern seismic building codes."
    ],
    "content": "### Seismic Base Shear & Modal Analysis (IS 1893:2016)\n\nThe design seismic base shear ($V_b$) of a building is computed as:\n\n$$V_b = A_h \\times W$$\n$$A_h = \\frac{Z}{2} \\times \\frac{I}{R} \\times \\left(\\frac{S_a}{g}\\right)$$\n\nWhere $Z$ is the Seismic Zone factor, $I$ is Importance factor, $R$ is Response reduction factor (5.0 for SMRF), and $S_a/g$ is average response acceleration coefficient."
  },

  {
    "id": "res-civ-found-1",
    "title": "Advanced Deep Foundations & Geotechnics: Piles & Raft Foundations",
    "description": "Foundation engineering: safe bearing capacity, bored cast-in-situ concrete pile groups, pile cap design, raft settlement analysis, and retaining walls in CSI SAFE.",
    "type": "DOCUMENTATION",
    "provider": "Bureau of Indian Standards (IS 2911) / Deep Foundations Institute",
    "sourceUrl": "https://www.dfi.org/",
    "domainIds": [
      "civil"
    ],
    "roleIds": [
      "Structural Engineer"
    ],
    "moduleIds": [
      "step-civ-foundation"
    ],
    "skillIds": [
      "Piles & Raft Design",
      "Geotechnical Engineering"
    ],
    "difficulty": "Advanced",
    "duration": "1.5 hours",
    "accessType": "Technical Standard Summary",
    "license": "Educational Reference",
    "learningObjectives": [
      "Calculate axial load carrying capacity of bored piles combining end-bearing and skin friction (IS 2911).",
      "Design rigid pile caps for 3-pile and 4-pile configurations using strut-and-tie and truss analogy models.",
      "Model soil-structure interaction using Winkler subgrade modulus springs in CSI SAFE."
    ],
    "keyTakeaways": [
      "Piles transfer heavy multi-storey column loads through weak surface clays down into hard competent rock stratum.",
      "Differential settlement between adjacent column footings is far more destructive than uniform settlement."
    ],
    "content": "### Deep Foundation Axial Capacity (IS 2911 Part 1)\n\nThe ultimate axial bearing capacity ($Q_u$) of a single cast-in-situ bored pile is:\n\n$$Q_u = Q_b + Q_s = A_b \\times q_b + \\sum (A_s \\times f_s)$$\n\nWhere $A_b$ is base cross-sectional area, $q_b$ is unit end-bearing capacity, $A_s$ is shaft perimeter surface area, and $f_s$ is unit skin friction resistance."
  },

  {
    "id": "res-civ-capstone-1",
    "title": "G+15 Commercial Tower Structural & BIM Package Capstone",
    "description": "Civil structural capstone: analyze a G+15 commercial tower in ETABS, design ductile shear walls, create 3D BIM rebar model in Revit, and generate structural bar bending schedules.",
    "type": "PROJECT",
    "provider": "SkillBridge Structural Lab",
    "sourceUrl": "https://nptel.ac.in/courses/105105105",
    "domainIds": [
      "civil"
    ],
    "roleIds": [
      "Structural Engineer"
    ],
    "moduleIds": [
      "step-civ-capstone"
    ],
    "skillIds": [
      "Complete Building Design Package",
      "ETABS",
      "BIM Revit"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Complete the structural analysis of a G+15 dual system (frame + shear wall) high-rise tower in ETABS.",
      "Design ductile beam-column joints complying with IS 13920:2016 earthquake-resistant detailing.",
      "Export structural geometry into Autodesk Revit to produce structural drawings and Bar Bending Schedules (BBS)."
    ],
    "keyTakeaways": [
      "Ductile detailing ensures joints can sustain inelastic cyclic reversals without brittle concrete shear failure.",
      "A complete structural calculation sheet and BIM package verified on Skill Passport qualifies graduates for top consulting firms."
    ],
    "content": "### High-Rise Tower Capstone Deliverables\n\n1. Full ETABS building model file (.edb) with static, dynamic response spectrum, and wind load combinations.\n2. Complete structural design calculation sheets for critical ground-floor columns, transfer girders, and shear core walls.\n3. Revit structural model (.rvt) with detailed reinforcement placement and bar bending schedules."
  },

  {
    "id": "res-swe-dsa-1",
    "title": "Advanced Data Structures & Algorithms: Graphs, Heaps & Dynamic Programming",
    "description": "Algorithmic mastery: Dijkstra shortest paths, Union-Find, Top-K frequent elements with Min-Heaps, Trie structures, and 2D dynamic programming optimization patterns.",
    "type": "ARTICLE",
    "provider": "MIT OpenCourseWare / LeetCode",
    "sourceUrl": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Software Engineer"
    ],
    "moduleIds": [
      "step-swe-dsa"
    ],
    "skillIds": [
      "DSA & Problem Solving",
      "Algorithms"
    ],
    "difficulty": "Intermediate",
    "duration": "2 hours",
    "accessType": "Open Academic Courseware",
    "license": "MIT Creative Commons",
    "learningObjectives": [
      "Implement Dijkstra's shortest path algorithm using a Priority Queue in O((V + E) log V) time.",
      "Solve interval scheduling, 0/1 knapsack, and longest common subsequence using dynamic programming memoization.",
      "Detect cycles in directed and undirected graphs using Kahn's algorithm (Topological Sort) and Disjoint Set Union."
    ],
    "keyTakeaways": [
      "Optimal algorithm selection transforms polynomial time O(N^2) bottlenecks into scalable O(N log N) throughput.",
      "Space-time trade-offs are fundamental to engineering scalable software systems."
    ],
    "content": "### Dijkstra Shortest Path Implementation\n\n```javascript\nfunction dijkstra(graph, startNode) {\n  const distances = {};\n  const pq = new MinPriorityQueue();\n  \n  for (const node in graph) distances[node] = Infinity;\n  distances[startNode] = 0;\n  pq.enqueue(startNode, 0);\n\n  while (!pq.isEmpty()) {\n    const { element: curr, priority: currDist } = pq.dequeue();\n    if (currDist > distances[curr]) continue;\n\n    for (const neighbor in graph[curr]) {\n      const weight = graph[curr][neighbor];\n      const dist = currDist + weight;\n      if (dist < distances[neighbor]) {\n        distances[neighbor] = dist;\n        pq.enqueue(neighbor, dist);\n      }\n    }\n  }\n  return distances;\n}\n```"
  },

  {
    "id": "res-swe-docker-1",
    "title": "Containerization & Microservices: Docker, Multi-Stage Builds & CI/CD",
    "description": "DevOps engineering: writing minimal production Dockerfiles, multi-stage compilation, Docker Compose service orchestration, healthchecks, and GitHub Actions CI pipelines.",
    "type": "DOCUMENTATION",
    "provider": "Docker Docs / Linux Foundation",
    "sourceUrl": "https://docs.docker.com/get-started/",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Software Engineer"
    ],
    "moduleIds": [
      "step-swe-docker"
    ],
    "skillIds": [
      "Docker & CI/CD",
      "Containerization"
    ],
    "difficulty": "Intermediate",
    "duration": "1.5 hours",
    "accessType": "Official Open Documentation",
    "license": "Apache 2.0",
    "learningObjectives": [
      "Construct secure, minimal multi-stage Dockerfiles reducing production image footprints below 100MB.",
      "Orchestrate multi-container environments (Frontend, API, Redis, PostgreSQL) with Docker Compose.",
      "Implement automated GitHub Actions CI/CD workflows executing unit tests and image publication."
    ],
    "keyTakeaways": [
      "Multi-stage builds leave build compilers and devDependencies out of runtime images.",
      "Never run production containers as root; define dedicated non-privileged service users."
    ],
    "content": "### Production Multi-Stage Node.js Dockerfile\n\n```dockerfile\n# Stage 1: Build & Dependencies\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build && npm prune --production\n\n# Stage 2: Minimal Runtime Container\nFROM node:20-alpine AS runner\nWORKDIR /app\nUSER node\nCOPY --from=builder /app/package.json ./\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]\n```"
  },

  {
    "id": "res-swe-capstone-1",
    "title": "Production Distributed Microservices Capstone",
    "description": "Software engineering capstone: build an event-driven e-commerce ordering engine handling 1,000 req/sec with Node.js/Go, Redis rate limiting, Kafka/RabbitMQ events, and PostgreSQL.",
    "type": "PROJECT",
    "provider": "SkillBridge Software Lab",
    "sourceUrl": "https://github.com/",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Software Engineer"
    ],
    "moduleIds": [
      "step-swe-capstone"
    ],
    "skillIds": [
      "End-to-End Distributed App",
      "System Design",
      "Microservices"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Implement idempotent payment and order processing using database transactions and outbox patterns.",
      "Deploy a distributed token-bucket rate limiter with Redis to defend against traffic spikes.",
      "Execute automated load testing with k6 validating sub-50ms p95 latency under 1,000 concurrent requests."
    ],
    "keyTakeaways": [
      "Event-driven architecture decouples order submission from asynchronous inventory and notification processing.",
      "A deployed microservices capstone repository with CI/CD and load benchmarks is the gold standard for software developer placement."
    ],
    "content": "### Distributed Microservices Capstone Deliverables\n\n1. Monorepo or multi-service Git repository with Docker Compose orchestration.\n2. Architecture specification detailing database schema, API contracts, and message queues.\n3. k6 load test execution report verifying system throughput and latency bounds under stress."
  },

  {
    "id": "res-da-sql-fund-1",
    "title": "SQL Fundamentals: Schema Design, Filtering, Joins & Aggregations",
    "description": "Core relational database mechanics: table creation, primary/foreign keys, SELECT filters, multi-table INNER/LEFT/RIGHT JOINs, GROUP BY, and HAVING clauses.",
    "type": "ARTICLE",
    "provider": "PostgreSQL Global Development Group / W3C",
    "sourceUrl": "https://www.postgresql.org/docs/current/tutorial-sql.html",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Data Analyst"
    ],
    "moduleIds": [
      "step-sql-fund",
      "sql-fundamentals"
    ],
    "skillIds": [
      "SQL Querying",
      "Relational Databases"
    ],
    "difficulty": "Beginner",
    "duration": "1 hour",
    "accessType": "Official Documentation",
    "license": "PostgreSQL License",
    "learningObjectives": [
      "Understand relational table structure, primary keys, and foreign keys.",
      "Write multi-table INNER, LEFT, and RIGHT JOINs to combine customer and order records.",
      "Aggregate sales metrics using SUM, COUNT, AVG, and GROUP BY."
    ],
    "keyTakeaways": [
      "Relational databases enforce data integrity through schema constraints and relationships.",
      "WHERE filters individual rows before aggregation; HAVING filters grouped summary results.",
      "LEFT JOIN preserves all rows from the primary table even when matching records are absent."
    ],
    "content": "### Relational SQL Fundamentals\n\n```sql\n-- Calculate customer lifetime spend with multi-table join\nSELECT \n  c.customer_id,\n  c.customer_name,\n  c.city,\n  COUNT(o.order_id) AS total_orders,\n  COALESCE(SUM(o.total_amount), 0) AS lifetime_spend\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE c.account_status = 'Active'\nGROUP BY c.customer_id, c.customer_name, c.city\nHAVING COUNT(o.order_id) >= 1\nORDER BY lifetime_spend DESC;\n```"
  },

  {
    "id": "res-da-stats-1",
    "title": "Applied Statistics for Analysts: Hypothesis Testing & A/B Experiments",
    "description": "Statistical decision making: normal distributions, central limit theorem, hypothesis testing (Z-test, T-test, Chi-Square), p-values, confidence intervals, and statistical power.",
    "type": "PDF",
    "provider": "OpenIntro Statistics / Stanford Online",
    "sourceUrl": "https://www.openintro.org/book/os/",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Data Analyst"
    ],
    "moduleIds": [
      "step-stats"
    ],
    "skillIds": [
      "Applied Statistics",
      "A/B Testing",
      "Hypothesis Testing"
    ],
    "difficulty": "Intermediate",
    "duration": "1.5 hours",
    "accessType": "Open Textbook",
    "license": "Creative Commons Attribution-ShareAlike",
    "learningObjectives": [
      "Formulate null ($H_0$) and alternative ($H_a$) hypotheses for commercial product experiments.",
      "Calculate two-sample t-test statistics and interpret p-values against significance thresholds (alpha = 0.05).",
      "Determine required sample size to achieve 80% statistical power while minimizing Type I and Type II errors."
    ],
    "keyTakeaways": [
      "A p-value measures the probability of observing sample results as extreme as measured under the null hypothesis.",
      "Correlation between two variables does not imply causal relationship; randomized A/B tests isolate causation.",
      "Type I error represents a false positive; Type II error represents a false negative."
    ],
    "content": "### A/B Hypothesis Testing Mathematical Formulation\n\nIn an A/B test comparing conversion rates between Control ($p_A$) and Variant ($p_B$):\n\n#### Two-Proportion Z-Test:\n$$Z = \\frac{(p_B - p_A) - 0}{\\sqrt{p_{\\text{pool}} (1 - p_{\\text{pool}}) \\left(\\frac{1}{n_A} + \\frac{1}{n_B}\\right)}}$$\n\nWhere $p_{\\text{pool}} = \\frac{x_A + x_B}{n_A + n_B}$. If $|Z| > 1.96$, the conversion difference is statistically significant at the 95% confidence level."
  },

  {
    "id": "res-da-capstone-1",
    "title": "End-to-End Enterprise Analytics & Executive Dashboard Capstone",
    "description": "Analytics capstone: extract raw enterprise sales and customer churn data from PostgreSQL, perform EDA in Python/Pandas, build a Power BI Star Schema, and publish an executive dashboard.",
    "type": "PROJECT",
    "provider": "SkillBridge Data Lab",
    "sourceUrl": "https://www.microsoft.com/en-us/power-platform/products/power-bi",
    "domainIds": [
      "cs_it"
    ],
    "roleIds": [
      "Data Analyst"
    ],
    "moduleIds": [
      "step-capstone",
      "data-analytics-project"
    ],
    "skillIds": [
      "Full Pipeline Integration",
      "SQL",
      "Power BI",
      "Python EDA"
    ],
    "difficulty": "Advanced",
    "duration": "4 hours",
    "accessType": "Free Capstone",
    "license": "SkillBridge Educational Lab",
    "learningObjectives": [
      "Extract and clean 100,000+ transaction records using SQL queries and Python Pandas.",
      "Architect a normalized Star Schema data model separating FactSales from DimCustomer and DimDate.",
      "Construct interactive Power BI reports with dynamic DAX KPI cards and cohort retention heatmaps."
    ],
    "keyTakeaways": [
      "Enterprise analytics combines data engineering, dimensional modeling, and storytelling into actionable executive insights.",
      "A completed end-to-end dashboard deliverable verified on Skill Passport qualifies candidates for top analytics roles."
    ],
    "content": "### Data Analyst Capstone Deliverables\n\n1. SQL data extraction and cleaning script (.sql) handling missing values and outlier transactions.\n2. Complete Power BI desktop file (.pbix) with Star Schema relationships and time intelligence DAX measures.\n3. 1-page executive summary memo highlighting revenue growth drivers and customer cohort churn patterns."
  }
];
