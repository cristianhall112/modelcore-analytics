import React, { useState } from 'react';

export default function ModelCoreWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sensitivityVars, setSensitivityVars] = useState({
    churn: 5,
    cac: 1000,
    arpu: 5000,
    margin: 65,
    opex: 400000
  });
  const [breakEvenInputs, setBreakEvenInputs] = useState({
    fixedCosts: 100000,
    pricePerUnit: 100,
    variableCost: 30
  });

  const calculateSensitivity = () => {
    const baseEBITDA = 500000;
    const changes = {
      churn: (sensitivityVars.churn - 5) * 15000,
      cac: ((sensitivityVars.cac - 1000) / 1000) * -80000,
      arpu: ((sensitivityVars.arpu - 5000) / 5000) * 120000,
      margin: (sensitivityVars.margin - 65) * 8000,
      opex: ((sensitivityVars.opex - 400000) / 100000) * -50000
    };
    return baseEBITDA + Object.values(changes).reduce((a, b) => a + b, 0);
  };

  const calculateBreakEven = () => {
    const contribution = breakEvenInputs.pricePerUnit - breakEvenInputs.variableCost;
    return Math.ceil(breakEvenInputs.fixedCosts / contribution);
  };

  const sensitivityResult = calculateSensitivity();
  const breakEvenUnits = calculateBreakEven();
  const breakEvenRevenue = (breakEvenUnits * breakEvenInputs.pricePerUnit).toLocaleString();

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
      {/* Navigation */}
      <nav style={{
        background: '#1a1a1a',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #cc0000',
        marginBottom: '0'
      }}>
        <div style={{ fontSize: '20px', fontWeight: '600', color: '#cc0000', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
          ModelCore Analytics
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13px' }}>
          {['home', 'services', 'tools', 'learn', 'resources', 'about', 'contact'].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === page ? '#cc0000' : '#ccc',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: currentPage === page ? '600' : '400',
                textTransform: 'capitalize',
                padding: '4px 0',
                transition: 'color 0.2s'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </nav>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', color: '#fff', padding: '60px 40px', textAlign: 'center', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px', color: '#cc0000', fontWeight: '600' }}>Financial Modeling Expertise</h1>
          <p style={{ fontSize: '20px', color: '#ccc', margin: '0 0 10px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            Eliminate the frustrating legwork of financial modeling by delivering professional financial data that is easy to understand and easy to present to any audience.
          </p>
          <p style={{ fontSize: '14px', color: '#999', margin: '0 0 30px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            Serving startups, students, and turnarounds with rigorous analysis and actionable insights.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('tools')} style={{
              background: '#cc0000',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>Interactive Tools</button>
            <button onClick={() => setCurrentPage('services')} style={{
              background: 'transparent',
              color: '#cc0000',
              border: '2px solid #cc0000',
              padding: '12px 28px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>Our Services</button>
            <button onClick={() => setCurrentPage('learn')} style={{
              background: 'transparent',
              color: '#999',
              border: '2px solid #666',
              padding: '12px 28px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>Learn</button>
          </div>
        </div>
      )}

      {/* Services Page */}
      {currentPage === 'services' && (
        <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Our Services</h1>
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              { title: 'Financial Statement Analysis', desc: 'Comprehensive analysis of financial statements, key metrics, and performance indicators. We deliver clear, actionable insights through detailed reports and presentations.' },
              { title: 'DCF Modeling', desc: 'Professional discounted cash flow models for valuation, forecasting, and strategic planning. Built with transparent assumptions and detailed sensitivity analysis.' },
              { title: 'Company Valuations', desc: 'Multi-method valuations using DCF, comparable company analysis, precedent transactions, and asset-based approaches. Critical for fundraising, M&A, and strategic decisions.' },
              { title: 'Sensitivity & Scenario Analysis', desc: 'Stress-test your assumptions and identify true business drivers. Model base, downside, and upside cases. Understand what actually matters for your business.' },
              { title: 'Merger & Acquisition Analysis', desc: 'Full M&A evaluation: target valuation, synergy identification, deal modeling, accretion/dilution analysis, and integration planning. Buy vs. build analysis.' },
              { title: 'Custom Financial Modeling', desc: 'Non-standard problems requiring creative modeling. Revenue projections for complex businesses, multi-scenario planning, custom KPI frameworks, whatever you need analyzed.' }
            ].map((service, i) => (
              <div key={i} style={{
                border: '1px solid #666',
                borderLeft: '4px solid #cc0000',
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '4px'
              }}>
                <h3 style={{ color: '#cc0000', margin: '0 0 10px', fontSize: '18px' }}>{service.title}</h3>
                <p style={{ margin: '0', color: '#555', lineHeight: '1.6' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Tools */}
      {currentPage === 'tools' && (
        <div style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Financial Modeling Tools</h1>
          
          {/* Tool Tabs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', borderBottom: '2px solid #ddd', paddingBottom: '0' }}>
            {['dcf', 'valuation', 'sensitivity', 'breakeven'].map(tool => (
              <button
                key={tool}
                onClick={() => setCurrentPage(`tool-${tool}`)}
                style={{
                  background: currentPage === `tool-${tool}` ? '#cc0000' : 'transparent',
                  color: currentPage === `tool-${tool}` ? '#fff' : '#666',
                  border: 'none',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  borderBottom: currentPage === `tool-${tool}` ? '3px solid #cc0000' : 'none',
                  marginBottom: '-2px'
                }}
              >
                {tool === 'dcf' ? 'DCF Valuation' : tool === 'breakeven' ? 'Break-Even' : tool.charAt(0).toUpperCase() + tool.slice(1)}
              </button>
            ))}
          </div>

          {/* Show DCF Tool */}
          {(currentPage === 'tools' || currentPage === 'tool-dcf') && (
            <div>
              <h2 style={{ color: '#666', fontSize: '24px', marginBottom: '30px' }}>Discounted Cash Flow (DCF) Valuation</h2>
              <p style={{ color: '#666', marginBottom: '30px' }}>Use our DCF calculator to value your business or target company. Download the full template to customize further.</p>
              <div style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', padding: '30px' }}>
                <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>📥 <strong>Download the complete DCF template:</strong> Customize with your specific assumptions and build comprehensive models with sensitivity analysis.</p>
                <button style={{
                  background: '#cc0000',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>Download DCF Template (CSV)</button>
              </div>
            </div>
          )}

          {/* Show Valuation Tool */}
          {currentPage === 'tool-valuation' && (
            <div>
              <h2 style={{ color: '#666', fontSize: '24px', marginBottom: '30px' }}>Quick Valuation by Multiples</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Annual EBITDA</label>
                    <input type="number" defaultValue={500000} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>EBITDA Multiple</label>
                    <input type="number" defaultValue={10} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Annual Revenue</label>
                    <input type="number" defaultValue={2000000} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 8px' }}>Enterprise Value (EBITDA)</p>
                    <p style={{ color: '#cc0000', fontSize: '32px', fontWeight: '600', margin: '0' }}>$5.0M</p>
                  </div>
                  <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 8px' }}>Download full valuation template for deeper analysis</p>
                    <button style={{
                      background: '#cc0000',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      marginTop: '10px'
                    }}>Download Template</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show Sensitivity Tool */}
          {currentPage === 'tool-sensitivity' && (
            <div>
              <h2 style={{ color: '#666', fontSize: '24px', marginBottom: '30px' }}>Sensitivity Analysis Calculator</h2>
              <p style={{ color: '#666', marginBottom: '25px' }}>Identify which assumptions drive the biggest impact on your business. Adjust each variable to see impact on Year 5 EBITDA.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Monthly Churn Rate (%): {sensitivityVars.churn}%</label>
                    <input type="range" min="1" max="10" value={sensitivityVars.churn} onChange={(e) => setSensitivityVars({...sensitivityVars, churn: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>CAC: ${sensitivityVars.cac.toLocaleString()}</label>
                    <input type="range" min="500" max="2000" step="100" value={sensitivityVars.cac} onChange={(e) => setSensitivityVars({...sensitivityVars, cac: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>ARPU: ${sensitivityVars.arpu.toLocaleString()}</label>
                    <input type="range" min="3000" max="8000" step="500" value={sensitivityVars.arpu} onChange={(e) => setSensitivityVars({...sensitivityVars, arpu: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Gross Margin (%): {sensitivityVars.margin}%</label>
                    <input type="range" min="40" max="80" value={sensitivityVars.margin} onChange={(e) => setSensitivityVars({...sensitivityVars, margin: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Annual OpEx: ${sensitivityVars.opex.toLocaleString()}</label>
                    <input type="range" min="200000" max="600000" step="50000" value={sensitivityVars.opex} onChange={(e) => setSensitivityVars({...sensitivityVars, opex: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                  </div>
                </div>
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <p style={{ color: '#666', fontSize: '12px', margin: '0 0 8px' }}>Year 5 EBITDA Impact</p>
                  <p style={{ color: '#cc0000', fontSize: '36px', fontWeight: '600', margin: '0 0 20px' }}>${(sensitivityResult / 1000).toFixed(0)}K</p>
                  <div style={{ background: '#fff', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
                    <p style={{ color: '#666', fontSize: '11px', margin: '0 0 8px' }}>Most Sensitive Variables:</p>
                    <p style={{ color: '#333', fontSize: '12px', margin: '0' }}>1. Monthly Churn Rate</p>
                    <p style={{ color: '#333', fontSize: '12px', margin: '0' }}>2. Customer Acquisition</p>
                    <p style={{ color: '#333', fontSize: '12px', margin: '0' }}>3. ARPU / Pricing</p>
                  </div>
                  <p style={{ color: '#666', fontSize: '11px', margin: '15px 0 0' }}>Use the full template to rank all variables and build KPI dashboard</p>
                </div>
              </div>
            </div>
          )}

          {/* Show Break-Even Tool */}
          {currentPage === 'tool-breakeven' && (
            <div>
              <h2 style={{ color: '#666', fontSize: '24px', marginBottom: '30px' }}>Break-Even Analysis</h2>
              <p style={{ color: '#666', marginBottom: '25px' }}>Calculate how many units you need to sell to cover your fixed costs.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Annual Fixed Costs</label>
                    <input type="number" value={breakEvenInputs.fixedCosts} onChange={(e) => setBreakEvenInputs({...breakEvenInputs, fixedCosts: parseFloat(e.target.value)})} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Price Per Unit</label>
                    <input type="number" value={breakEvenInputs.pricePerUnit} onChange={(e) => setBreakEvenInputs({...breakEvenInputs, pricePerUnit: parseFloat(e.target.value)})} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Variable Cost Per Unit</label>
                    <input type="number" value={breakEvenInputs.variableCost} onChange={(e) => setBreakEvenInputs({...breakEvenInputs, variableCost: parseFloat(e.target.value)})} style={{ width: '100%', padding: '8px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 8px' }}>Break-Even Units</p>
                    <p style={{ color: '#cc0000', fontSize: '32px', fontWeight: '600', margin: '0' }}>{breakEvenUnits.toLocaleString()}</p>
                  </div>
                  <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 8px' }}>Break-Even Revenue</p>
                    <p style={{ color: '#333', fontSize: '24px', fontWeight: '600', margin: '0' }}>${breakEvenRevenue}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Learning Resources */}
      {currentPage === 'learn' && (
        <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Learning Resources</h1>
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              { title: 'Scenario Analysis: Stress-Testing Your Business Model', topic: 'Guide', desc: 'Learn how to model base, downside, and upside cases. Understand ranges, not point estimates. Critical for planning under uncertainty.' },
              { title: 'Sensitivity Analysis: Finding Your Business Drivers', topic: 'Guide', desc: 'Identify which assumptions move the needle. Rank variables by impact. Build KPI dashboards around what matters most.' },
              { title: 'M&A Analysis: Should You Acquire or Build?', topic: 'Framework', desc: 'Valuation methods, synergy identification, accretion/dilution analysis. Full framework for evaluating deals and making rational acquisition decisions.' },
              { title: 'DCF Fundamentals', topic: 'Explainer', desc: 'Deep dive into discounted cash flow valuation. Understand projections, discount rates, terminal value, and how to stress-test assumptions.' },
              { title: 'Financial Statement Analysis 101', topic: 'Explainer', desc: 'Read and interpret income statements, balance sheets, and cash flow statements. Build financial intuition for any business.' }
            ].map((resource, i) => (
              <div key={i} style={{
                background: '#f5f5f5',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#cc0000', margin: '0 0 6px', fontSize: '16px' }}>{resource.title}</h3>
                    <p style={{ color: '#999', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase' }}>{resource.topic}</p>
                    <p style={{ margin: '0', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>{resource.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
            <p style={{ color: '#666', fontSize: '13px', margin: '0' }}>Full educational guides with detailed examples, frameworks, and real-world case studies available. Click on any topic to read the complete guide.</p>
          </div>
        </div>
      )}

      {/* Resources & Downloads */}
      {currentPage === 'resources' && (
        <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Templates & Resources</h1>
          <p style={{ color: '#666', marginBottom: '40px', fontSize: '15px' }}>Download professionally designed templates to model your business, analyze scenarios, evaluate M&A deals, and identify key drivers.</p>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              { 
                name: 'DCF Valuation Model', 
                desc: 'Complete DCF model with 5-year projections, discount rate inputs, terminal value, and 2-way sensitivity analysis. Customize with your assumptions.',
                file: 'DCF_Model_Template.csv',
                icon: '📊'
              },
              { 
                name: 'Scenario Analysis Template', 
                desc: 'Model base, downside, and upside cases. Compare outcomes. Assign probabilities. Understand the range of possible futures for your business.',
                file: 'Scenario_Analysis_Template.csv',
                icon: '🎯'
              },
              { 
                name: 'Sensitivity Analysis Template', 
                desc: 'Identify your business drivers. Rank variables by impact. Build KPI dashboard. Understand what to obsess over.',
                file: 'Sensitivity_Analysis_Template.csv',
                icon: '🎚️'
              },
              { 
                name: 'M&A Analysis Workbook', 
                desc: 'Target valuation (DCF + multiples), synergy identification, integration costs, accretion/dilution analysis, deal structure options.',
                file: 'M&A_Analysis_Template.csv',
                icon: '🤝'
              }
            ].map((template, i) => (
              <div key={i} style={{
                background: '#f5f5f5',
                border: '1px solid #ddd',
                borderLeft: '4px solid #cc0000',
                padding: '24px',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                  <div style={{ fontSize: '32px' }}>{template.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#cc0000', margin: '0 0 8px', fontSize: '17px' }}>{template.name}</h3>
                    <p style={{ margin: '0 0 12px', color: '#666', lineHeight: '1.6', fontSize: '14px' }}>{template.desc}</p>
                    <button style={{
                      background: '#cc0000',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>Download (CSV)</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ color: '#cc0000', margin: '0 0 12px', fontSize: '16px' }}>How to Use These Templates</h3>
            <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.8' }}>
              <p style={{ margin: '0 0 10px' }}>✓ Download as CSV and open in Excel or Google Sheets</p>
              <p style={{ margin: '0 0 10px' }}>✓ Fill in the gray cells with your assumptions</p>
              <p style={{ margin: '0 0 10px' }}>✓ All other cells calculate automatically</p>
              <p style={{ margin: '0 0 10px' }}>✓ Use sensitivity analysis to identify key drivers</p>
              <p style={{ margin: '0 0 0' }}>✓ Share with board, investors, or stakeholders for alignment</p>
            </div>
          </div>
        </div>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>About ModelCore Analytics</h1>
          <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#555' }}>
            <h3 style={{ color: '#cc0000', marginTop: '0' }}>Our Mission</h3>
            <p style={{ fontStyle: 'italic', color: '#999', marginBottom: '20px', fontSize: '15px' }}>
              "At ModelCore Analytics, our mission is to eliminate the frustrating legwork of financial modeling by delivering professional financial data that is easy to understand and easy to present to any audience."
            </p>
            
            <h3 style={{ color: '#cc0000' }}>Who We Serve</h3>
            <p>
              ModelCore Analytics specializes in rigorous financial analysis and modeling for businesses at any stage. We serve:
            </p>
            <ul style={{ marginLeft: '20px' }}>
              <li><strong>Startups</strong> navigating growth, fundraising, and strategic decisions</li>
              <li><strong>Students</strong> building analytical skills and learning financial modeling</li>
              <li><strong>Companies</strong> managing complex turnarounds or evaluating strategic transactions</li>
            </ul>

            <h3 style={{ color: '#cc0000' }}>Our Approach</h3>
            <p>
              We believe that strong financial modeling is the foundation of sound decision-making. Whether you're raising capital, evaluating an acquisition, or forecasting under uncertainty, your assumptions matter. Our models are built to be:
            </p>
            <ul style={{ marginLeft: '20px' }}>
              <li><strong>Rigorous</strong> — We challenge assumptions and stress-test scenarios</li>
              <li><strong>Clear</strong> — Complex models delivered in digestible formats</li>
              <li><strong>Flexible</strong> — We model anything; no financial problem is off-limits</li>
              <li><strong>Educational</strong> — We help you understand the "why" behind our analysis</li>
            </ul>
          </div>
        </div>
      )}

      {/* Contact Page */}
      {currentPage === 'contact' && (
        <div style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Get in Touch</h1>
          <form style={{ display: 'grid', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! We will contact you soon.'); }}>
            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Name</label>
              <input type="text" placeholder="Your name" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Email</label>
              <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>Company</label>
              <input type="text" placeholder="Your company" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '6px' }}>What can we help with?</label>
              <textarea placeholder="Financial analysis, valuation, scenario modeling, or something else?" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '4px', boxSizing: 'border-box', minHeight: '120px', fontFamily: 'Arial, sans-serif' }} required />
            </div>
            <button type="submit" style={{
              background: '#cc0000',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '4px',
              alignSelf: 'flex-start'
            }}>Send Message</button>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: '#0a0a0a',
        color: '#666',
        padding: '30px 40px',
        textAlign: 'center',
        fontSize: '12px',
        marginTop: '60px',
        borderTop: '1px solid #ddd'
      }}>
        <p style={{ margin: '0 0 10px' }}>© 2024 ModelCore Analytics. All rights reserved.</p>
        <p style={{ margin: '0', fontSize: '11px' }}>Precision financial modeling. Clear insights. Easy to present.</p>
      </footer>
    </div>
  );
}