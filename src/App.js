import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');
  const [tool, setTool] = useState('dcf');
  const [churn, setChurn] = useState(5);
  const [cac, setCac] = useState(1000);
  const [arpu, setArpu] = useState(5000);
  const [margin, setMargin] = useState(65);
  const [opex, setOpex] = useState(400000);
  const [fixedCosts, setFixedCosts] = useState(100000);
  const [price, setPrice] = useState(100);
  const [varCost, setVarCost] = useState(30);

  const baseEBITDA = 500000;
  const ebitda = baseEBITDA
    + (5 - churn) * 15000
    + ((1000 - cac) / 1000) * 80000
    + ((arpu - 5000) / 5000) * 120000
    + (margin - 65) * 8000
    + ((400000 - opex) / 100000) * 50000;

  const beUnits = price > varCost ? Math.ceil(fixedCosts / (price - varCost)) : 0;
  const beRevenue = beUnits * price;

  const downloadCSV = (filename, content) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dcfCSV = [
    'ModelCore Analytics - DCF Valuation Model Template',
    'Instructions: Fill in your assumptions. Formulas described in notes column.',
    '',
    'ASSUMPTIONS,Value,Notes',
    'Company Name,Your Company,',
    'Current Annual Revenue,5000000,Starting point for projections',
    'Revenue Growth Year 1,25%,',
    'Revenue Growth Year 2,20%,',
    'Revenue Growth Year 3,15%,',
    'Revenue Growth Year 4,12%,',
    'Revenue Growth Year 5,10%,',
    'EBITDA Margin,25%,Operating profitability',
    'Tax Rate,25%,',
    'CapEx as % of Revenue,8%,',
    'Discount Rate (WACC),10%,Risk-adjusted required return',
    'Terminal Growth Rate,3%,Long-term growth assumption',
    '',
    'PROJECTIONS,Year 1,Year 2,Year 3,Year 4,Year 5',
    'Revenue,=Prior*1.25,=Prior*1.20,=Prior*1.15,=Prior*1.12,=Prior*1.10',
    'EBITDA,=Revenue*0.25,=Revenue*0.25,=Revenue*0.25,=Revenue*0.25,=Revenue*0.25',
    'Free Cash Flow,=EBITDA*(1-Tax)-CapEx,...,...,...,...',
    'Discount Factor,=1/(1.10)^1,=1/(1.10)^2,=1/(1.10)^3,=1/(1.10)^4,=1/(1.10)^5',
    'PV of FCF,=FCF*DF,...,...,...,...',
    '',
    'VALUATION,Formula',
    'Sum of PV (Years 1-5),=SUM(PV row)',
    'Terminal Value,=Year5 FCF*(1+3%)/(10%-3%)',
    'PV of Terminal Value,=TV*Year5 Discount Factor',
    'Enterprise Value,=Sum PV + PV of TV'
  ].join('\n');

  const scenarioCSV = [
    'ModelCore Analytics - Scenario Analysis Template',
    '',
    'ASSUMPTIONS,Downside,Base Case,Upside',
    'Monthly Customer Acquisition,6,10,15',
    'Average Contract Value,4000,5000,6000',
    'Monthly Churn Rate,8%,5%,3%',
    'Gross Margin,75%,80%,85%',
    '',
    'YEAR 5 OUTCOMES,Downside,Base Case,Upside',
    'Revenue,4524000,9360000,22032000',
    'EBITDA,88120,1472000,6259600',
    'EBITDA Margin,1.9%,15.7%,28.4%',
    'Enterprise Value (at multiple),528720,14720000,93894000',
    '',
    'PROBABILITY WEIGHTING,Downside,Base Case,Upside',
    'Probability,20%,50%,30%',
    'Weighted EV,105744,7360000,28168200',
    'Expected Enterprise Value,35633944,,'
  ].join('\n');

  const sensitivityCSV = [
    'ModelCore Analytics - Sensitivity Analysis Template',
    '',
    'VARIABLE RANKING (by impact on Year 5 EBITDA)',
    'Rank,Variable,Impact Range,Priority',
    '1,Customer Churn Rate,860K,CRITICAL - obsess over retention',
    '2,Customer Acquisition,700K,HIGH - focus on marketing efficiency',
    '3,Pricing / ARPU,640K,HIGH - test pricing elasticity',
    '4,Gross Margin,400K,MEDIUM - optimize operations',
    '5,Operating Expenses,380K,MEDIUM - stay lean',
    '',
    'KPI DASHBOARD,Current,Target,Review Frequency',
    'Monthly Churn Rate,5%,Under 3%,Weekly',
    'Monthly New Customers,8,25+,Weekly',
    'CAC Payback Period,12 months,6 months,Monthly',
    'Gross Margin,65%,70%,Monthly',
    'OpEx as % of Revenue,50%,35%,Monthly'
  ].join('\n');

  const mnaCSV = [
    'ModelCore Analytics - M&A Analysis Template',
    '',
    'STANDALONE VALUATION,Value,Method',
    'DCF Analysis,68067887,5-year projection at 12% WACC',
    'Comparable Multiples,18400000,9.2x EBITDA average',
    'Precedent Transactions,58333333,Recent deals in sector',
    'Fair Value Range,18M - 55M,',
    'Recommended Offer Range,22M - 28M,',
    '',
    'SYNERGIES (Annual Run-Rate),Amount',
    'Cross-selling revenue,1400000',
    'Cost elimination (duplication),550000',
    'Operating leverage,650000',
    'Total Annual Synergies,2600000',
    '',
    'DEAL DECISION FRAMEWORK,',
    'Walk-away price,32000000',
    'Earnout recommendation,20M upfront + 8M earnout over 2 years',
    '',
    'RISK REGISTER,Probability,Mitigation',
    'Key person departure,Medium,Retention bonuses',
    'Customer churn post-close,Medium,Early communication plan',
    'Synergy overestimation,High,Conservative estimates + earnout'
  ].join('\n');

  const navStyle = (p) => ({
    background: 'none',
    border: 'none',
    color: page === p ? '#cc0000' : '#ccc',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: page === p ? 'bold' : 'normal',
    padding: '4px 8px'
  });

  const tabStyle = (t) => ({
    background: tool === t ? '#cc0000' : '#eee',
    color: tool === t ? '#fff' : '#333',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px 4px 0 0',
    marginRight: '8px'
  });

  const redBtn = {
    background: '#cc0000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold'
  };

  const card = {
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderLeft: '4px solid #cc0000',
    padding: '20px',
    marginBottom: '16px',
    borderRadius: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '16px'
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: '#1a1a1a', padding: '16px 24px', borderBottom: '3px solid #cc0000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#cc0000', cursor: 'pointer' }} onClick={() => setPage('home')}>
          ModelCore Analytics
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <button style={navStyle('home')} onClick={() => setPage('home')}>Home</button>
          <button style={navStyle('services')} onClick={() => setPage('services')}>Services</button>
          <button style={navStyle('tools')} onClick={() => setPage('tools')}>Tools</button>
          <button style={navStyle('learn')} onClick={() => setPage('learn')}>Learn</button>
          <button style={navStyle('resources')} onClick={() => setPage('resources')}>Resources</button>
          <button style={navStyle('about')} onClick={() => setPage('about')}>About</button>
          <button style={navStyle('contact')} onClick={() => setPage('contact')}>Contact</button>
        </div>
      </nav>

      <main style={{ flex: 1 }}>

        {page === 'home' && (
          <div style={{ background: '#111', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '42px', color: '#cc0000', margin: '0 0 20px' }}>Financial Modeling Expertise</h1>
            <p style={{ fontSize: '18px', color: '#ccc', maxWidth: '700px', margin: '0 auto 16px' }}>
              Eliminate the frustrating legwork of financial modeling with professional financial data
              that is easy to understand and easy to present to any audience.
            </p>
            <p style={{ fontSize: '14px', color: '#888', margin: '0 0 32px' }}>
              Serving startups, students, and turnarounds.
            </p>
            <button style={redBtn} onClick={() => setPage('tools')}>Try Our Tools</button>
            <span style={{ display: 'inline-block', width: '12px' }} />
            <button style={{ ...redBtn, background: 'transparent', border: '2px solid #cc0000', color: '#cc0000' }} onClick={() => setPage('services')}>Our Services</button>
          </div>
        )}

        {page === 'services' && (
          <div style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>Our Services</h1>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Financial Statement Analysis</h3>
              <p style={{ margin: 0, color: '#555' }}>Comprehensive analysis of financial statements, key metrics, and performance indicators with clear, actionable insights.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>DCF Modeling</h3>
              <p style={{ margin: 0, color: '#555' }}>Professional discounted cash flow models with transparent assumptions and detailed sensitivity analysis.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Company Valuations</h3>
              <p style={{ margin: 0, color: '#555' }}>Multi-method valuations: DCF, comparable companies, and precedent transactions for fundraising and M&A.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Sensitivity & Scenario Analysis</h3>
              <p style={{ margin: 0, color: '#555' }}>Stress-test assumptions, model base/downside/upside cases, and identify your true business drivers.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Merger & Acquisition Analysis</h3>
              <p style={{ margin: 0, color: '#555' }}>Target valuation, synergy identification, accretion/dilution analysis, and buy-vs-build frameworks.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Custom Financial Modeling</h3>
              <p style={{ margin: 0, color: '#555' }}>Non-standard problems requiring creative modeling. If it involves numbers, we can model it.</p>
            </div>
          </div>
        )}

        {page === 'tools' && (
          <div style={{ padding: '48px 24px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>Financial Modeling Tools</h1>

            <div style={{ borderBottom: '2px solid #cc0000', marginBottom: '24px' }}>
              <button style={tabStyle('dcf')} onClick={() => setTool('dcf')}>DCF Valuation</button>
              <button style={tabStyle('sensitivity')} onClick={() => setTool('sensitivity')}>Sensitivity</button>
              <button style={tabStyle('breakeven')} onClick={() => setTool('breakeven')}>Break-Even</button>
            </div>

            {tool === 'dcf' && (
              <div>
                <h2 style={{ color: '#555' }}>Discounted Cash Flow (DCF) Valuation</h2>
                <p style={{ color: '#666' }}>
                  Download our complete DCF template with 5-year projections, discount rates,
                  terminal value, and sensitivity tables. Open in Excel or Google Sheets and customize.
                </p>
                <button style={redBtn} onClick={() => downloadCSV('DCF_Model_Template.csv', dcfCSV)}>
                  Download DCF Template (CSV)
                </button>
              </div>
            )}

            {tool === 'sensitivity' && (
              <div>
                <h2 style={{ color: '#555' }}>Sensitivity Analysis Calculator</h2>
                <p style={{ color: '#666' }}>Move the sliders to see how each variable impacts Year 5 EBITDA.</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                  <div style={{ flex: '1 1 320px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
                      Monthly Churn Rate: {churn}%
                    </label>
                    <input type="range" min="1" max="10" value={churn}
                      onChange={(e) => setChurn(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '20px' }} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
                      Customer Acquisition Cost: ${cac.toLocaleString()}
                    </label>
                    <input type="range" min="500" max="2000" step="100" value={cac}
                      onChange={(e) => setCac(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '20px' }} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
                      ARPU: ${arpu.toLocaleString()}
                    </label>
                    <input type="range" min="3000" max="8000" step="250" value={arpu}
                      onChange={(e) => setArpu(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '20px' }} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
                      Gross Margin: {margin}%
                    </label>
                    <input type="range" min="40" max="85" value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      style={{ width: '100%', marginBottom: '20px' }} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>
                      Annual OpEx: ${opex.toLocaleString()}
                    </label>
                    <input type="range" min="200000" max="600000" step="25000" value={opex}
                      onChange={(e) => setOpex(Number(e.target.value))}
                      style={{ width: '100%' }} />
                  </div>

                  <div style={{ flex: '1 1 280px' }}>
                    <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px', padding: '24px' }}>
                      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>Projected Year 5 EBITDA</p>
                      <p style={{ color: '#cc0000', fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px' }}>
                        ${Math.round(ebitda).toLocaleString()}
                      </p>
                      <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px' }}>Most sensitive drivers:</p>
                      <p style={{ color: '#333', fontSize: '13px', margin: '2px 0' }}>1. Churn rate</p>
                      <p style={{ color: '#333', fontSize: '13px', margin: '2px 0' }}>2. ARPU / pricing</p>
                      <p style={{ color: '#333', fontSize: '13px', margin: '2px 0 16px' }}>3. Customer acquisition cost</p>
                      <button style={{ ...redBtn, width: '100%' }}
                        onClick={() => downloadCSV('Sensitivity_Analysis_Template.csv', sensitivityCSV)}>
                        Download Full Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tool === 'breakeven' && (
              <div>
                <h2 style={{ color: '#555' }}>Break-Even Analysis</h2>
                <p style={{ color: '#666' }}>Calculate how many units you need to sell to cover your fixed costs.</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                  <div style={{ flex: '1 1 320px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Annual Fixed Costs ($)</label>
                    <input type="number" value={fixedCosts}
                      onChange={(e) => setFixedCosts(Number(e.target.value) || 0)}
                      style={inputStyle} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Price Per Unit ($)</label>
                    <input type="number" value={price}
                      onChange={(e) => setPrice(Number(e.target.value) || 0)}
                      style={inputStyle} />

                    <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Variable Cost Per Unit ($)</label>
                    <input type="number" value={varCost}
                      onChange={(e) => setVarCost(Number(e.target.value) || 0)}
                      style={inputStyle} />
                  </div>

                  <div style={{ flex: '1 1 280px' }}>
                    <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px', padding: '24px' }}>
                      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>Break-Even Units</p>
                      <p style={{ color: '#cc0000', fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px' }}>
                        {price > varCost ? beUnits.toLocaleString() : 'N/A'}
                      </p>
                      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>Break-Even Revenue</p>
                      <p style={{ color: '#333', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                        {price > varCost ? '$' + beRevenue.toLocaleString() : 'Price must exceed variable cost'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {page === 'learn' && (
          <div style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>Learning Resources</h1>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Scenario Analysis: Stress-Testing Your Business Model</h3>
              <p style={{ margin: 0, color: '#555' }}>Model base, downside, and upside cases. Plan for ranges, not point estimates.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Sensitivity Analysis: Finding Your Business Drivers</h3>
              <p style={{ margin: 0, color: '#555' }}>Identify which assumptions move the needle and build your KPI dashboard around them.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>M&A Analysis: Should You Acquire or Build?</h3>
              <p style={{ margin: 0, color: '#555' }}>Valuation methods, synergy identification, and a full framework for rational deal-making.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>DCF Fundamentals</h3>
              <p style={{ margin: 0, color: '#555' }}>Projections, discount rates, terminal value, and stress-testing assumptions.</p>
            </div>
            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Financial Statement Analysis 101</h3>
              <p style={{ margin: 0, color: '#555' }}>Read and interpret income statements, balance sheets, and cash flow statements.</p>
            </div>
          </div>
        )}

        {page === 'resources' && (
          <div style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>Templates & Downloads</h1>
            <p style={{ color: '#666' }}>Download, open in Excel or Google Sheets, and customize with your assumptions.</p>

            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>DCF Valuation Model</h3>
              <p style={{ color: '#555', margin: '0 0 12px' }}>5-year projections, WACC, terminal value, and valuation structure.</p>
              <button style={redBtn} onClick={() => downloadCSV('DCF_Model_Template.csv', dcfCSV)}>Download CSV</button>
            </div>

            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Scenario Analysis Template</h3>
              <p style={{ color: '#555', margin: '0 0 12px' }}>Base, downside, and upside cases with probability weighting.</p>
              <button style={redBtn} onClick={() => downloadCSV('Scenario_Analysis_Template.csv', scenarioCSV)}>Download CSV</button>
            </div>

            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>Sensitivity Analysis Template</h3>
              <p style={{ color: '#555', margin: '0 0 12px' }}>Variable ranking, impact ranges, and a KPI dashboard.</p>
              <button style={redBtn} onClick={() => downloadCSV('Sensitivity_Analysis_Template.csv', sensitivityCSV)}>Download CSV</button>
            </div>

            <div style={card}>
              <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>M&A Analysis Workbook</h3>
              <p style={{ color: '#555', margin: '0 0 12px' }}>Valuation summary, synergies, deal framework, and risk register.</p>
              <button style={redBtn} onClick={() => downloadCSV('MA_Analysis_Template.csv', mnaCSV)}>Download CSV</button>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>About ModelCore Analytics</h1>
            <h3 style={{ color: '#cc0000' }}>Our Mission</h3>
            <p style={{ color: '#555', fontStyle: 'italic', lineHeight: 1.7 }}>
              "At ModelCore Analytics, our mission is to eliminate the frustrating legwork of financial
              modeling by delivering professional financial data that is easy to understand and easy
              to present to any audience."
            </p>
            <h3 style={{ color: '#cc0000' }}>Who We Serve</h3>
            <p style={{ color: '#555', lineHeight: 1.7 }}>
              Startups navigating growth and fundraising. Students building analytical skills.
              Companies managing turnarounds or evaluating strategic transactions.
            </p>
            <h3 style={{ color: '#cc0000' }}>Our Approach</h3>
            <p style={{ color: '#555', lineHeight: 1.7 }}>
              Rigorous: we challenge assumptions and stress-test scenarios.
              Clear: complex models delivered in digestible formats.
              Flexible: at the end of the day, numbers are numbers, and we can model almost anything.
            </p>
          </div>
        )}

        {page === 'contact' && (
          <div style={{ padding: '48px 24px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000' }}>Get in Touch</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! We will contact you soon.'); }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Name</label>
              <input type="text" required style={inputStyle} />
              <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Email</label>
              <input type="email" required style={inputStyle} />
              <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Company</label>
              <input type="text" style={inputStyle} />
              <label style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '4px' }}>Message</label>
              <textarea required style={{ ...inputStyle, minHeight: '120px' }} />
              <button type="submit" style={redBtn}>Send Message</button>
            </form>
          </div>
        )}
      </main>

      <footer style={{ background: '#111', color: '#888', padding: '24px', textAlign: 'center', fontSize: '13px' }}>
        <p style={{ margin: '0 0 4px' }}>© 2024 ModelCore Analytics. All rights reserved.</p>
        <p style={{ margin: 0 }}>Precision financial modeling. Clear insights. Easy to present.</p>
      </footer>
    </div>
  );
}

export default App;