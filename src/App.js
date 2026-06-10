import React, { useState } from 'react';

export default function ModelCoreWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [churn, setChurn] = useState(5);
  const [cac, setCac] = useState(1000);
  const [arpu, setArpu] = useState(5000);
  const [margin, setMargin] = useState(65);
  const [opex, setOpex] = useState(400000);
  const [fixedCosts, setFixedCosts] = useState(100000);
  const [pricePerUnit, setPricePerUnit] = useState(100);
  const [variableCost, setVariableCost] = useState(30);

  const calculateSensitivity = () => {
    const baseEBITDA = 500000;
    const changes = {
      churn: (churn - 5) * 15000,
      cac: ((cac - 1000) / 1000) * -80000,
      arpu: ((arpu - 5000) / 5000) * 120000,
      margin: (margin - 65) * 8000,
      opex: ((opex - 400000) / 100000) * -50000
    };
    return baseEBITDA + Object.values(changes).reduce((a, b) => a + b, 0);
  };

  const breakEvenUnits = Math.ceil(fixedCosts / (pricePerUnit - variableCost));
  const breakEvenRevenue = (breakEvenUnits * pricePerUnit).toLocaleString();
  const sensitivityResult = calculateSensitivity();

  const downloadCSV = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDCF = () => {
    const content = `ModelCore Analytics - DCF Valuation Model
Company Name,Your Company
Revenue Year 0,$5000000
WACC,10.2%
Terminal Growth,3%

Instructions: Fill in gray cells. All calculations automatic.
Download and customize in Excel or Google Sheets.`;
    downloadCSV('DCF_Model_Template.csv', content);
  };

  const downloadScenario = () => {
    const content = `ModelCore Analytics - Scenario Analysis
Company,Your Company
Metric,Downside,Base,Upside
Year 5 Revenue,$4.5M,$9.4M,$22M
EBITDA Margin,1.9%,15.7%,28.4%
Valuation,$528K,$14.7M,$93.9M`;
    downloadCSV('Scenario_Analysis_Template.csv', content);
  };

  const downloadSensitivity = () => {
    const content = `ModelCore Analytics - Sensitivity Analysis
Variable,Impact,Priority
Customer Acquisition,92%,CRITICAL
Pricing (ARPU),84%,CRITICAL
Churn Rate,113%,CRITICAL
Gross Margin,53%,IMPORTANT
OpEx Control,50%,IMPORTANT`;
    downloadCSV('Sensitivity_Analysis_Template.csv', content);
  };

  const downloadMnA = () => {
    const content = `ModelCore Analytics - M&A Analysis
Target,Your Target
DCF Valuation,$68M
Comparable Multiples,$18M
Fair Value Range,$18M-$55M
Recommended Price,$22M-$28M
Total Synergies,$2.4M annually`;
    downloadCSV('M&A_Analysis_Template.csv', content);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav style={{ background: '#1a1a1a', padding: '16px 20px', borderBottom: '2px solid #cc0000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '20px', fontWeight: '600', color: '#cc0000', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
          ModelCore Analytics
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {['home', 'services', 'tools', 'learn', 'resources', 'about', 'contact'].map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} style={{
              background: 'none', border: 'none', color: currentPage === page ? '#cc0000' : '#ccc', cursor: 'pointer', fontSize: '12px', fontWeight: currentPage === page ? '600' : '400', padding: '4px 0'
            }}>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <div style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', color: '#fff', padding: '60px 40px', textAlign: 'center', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '48px', margin: '0 0 20px', color: '#cc0000', fontWeight: '600' }}>Financial Modeling Expertise</h1>
            <p style={{ fontSize: '18px', color: '#ccc', margin: '0 0 30px' }}>Eliminate the frustrating legwork of financial modeling by delivering professional financial data that is easy to understand and easy to present.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentPage('tools')} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '4px' }}>Interactive Tools</button>
              <button onClick={() => setCurrentPage('services')} style={{ background: 'transparent', color: '#cc0000', border: '2px solid #cc0000', padding: '12px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '4px' }}>Services</button>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Our Services</h1>
            {['Financial Statement Analysis', 'DCF Modeling', 'Company Valuations', 'Sensitivity & Scenario Analysis', 'Merger & Acquisition Analysis', 'Custom Financial Modeling'].map((service, i) => (
              <div key={i} style={{ border: '1px solid #ddd', borderLeft: '4px solid #cc0000', padding: '20px', marginBottom: '20px', background: '#f9f9f9', borderRadius: '4px' }}>
                <h3 style={{ color: '#cc0000', margin: '0 0 10px' }}>{service}</h3>
                <p style={{ margin: '0', color: '#666', lineHeight: '1.6' }}>Professional {service.toLowerCase()} tailored to your business needs.</p>
              </div>
            ))}
          </div>
        )}

        {currentPage === 'tools' && (
          <div style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '30px' }}>Financial Modeling Tools</h1>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', borderBottom: '2px solid #ddd', paddingBottom: '0' }}>
              <button onClick={() => setCurrentPage('tools-dcf')} style={{ background: currentPage === 'tools-dcf' ? '#cc0000' : 'transparent', color: currentPage === 'tools-dcf' ? '#fff' : '#666', border: 'none', padding: '12px 24px', cursor: 'pointer', fontWeight: '600', marginBottom: '-2px' }}>DCF</button>
              <button onClick={() => setCurrentPage('tools-sensitivity')} style={{ background: currentPage === 'tools-sensitivity' ? '#cc0000' : 'transparent', color: currentPage === 'tools-sensitivity' ? '#fff' : '#666', border: 'none', padding: '12px 24px', cursor: 'pointer', fontWeight: '600', marginBottom: '-2px' }}>Sensitivity</button>
              <button onClick={() => setCurrentPage('tools-breakeven')} style={{ background: currentPage === 'tools-breakeven' ? '#cc0000' : 'transparent', color: currentPage === 'tools-breakeven' ? '#fff' : '#666', border: 'none', padding: '12px 24px', cursor: 'pointer', fontWeight: '600', marginBottom: '-2px' }}>Break-Even</button>
            </div>

            {currentPage === 'tools-dcf' && (
              <div>
                <h2 style={{ color: '#666', marginBottom: '20px' }}>DCF Valuation Model</h2>
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <p style={{ color: '#666', marginBottom: '15px' }}>📊 Complete 5-year DCF model with sensitivity analysis. Customize with your assumptions.</p>
                  <button onClick={downloadDCF} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', fontWeight: '600' }}>⬇️ Download DCF Template</button>
                </div>
              </div>
            )}

            {currentPage === 'tools-sensitivity' && (
              <div>
                <h2 style={{ color: '#666', marginBottom: '20px' }}>Sensitivity Analysis</h2>
                <p style={{ color: '#666', marginBottom: '25px' }}>Adjust sliders to see impact on Year 5 EBITDA.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Churn Rate: {churn}%</label>
                    <input type="range" min="1" max="10" value={churn} onChange={(e) => setChurn(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>CAC: ${cac.toLocaleString()}</label>
                    <input type="range" min="500" max="2000" step="100" value={cac} onChange={(e) => setCac(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>ARPU: ${arpu.toLocaleString()}</label>
                    <input type="range" min="3000" max="8000" step="500" value={arpu} onChange={(e) => setArpu(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Gross Margin: {margin}%</label>
                    <input type="range" min="40" max="80" value={margin} onChange={(e) => setMargin(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>OpEx: ${opex.toLocaleString()}</label>
                    <input type="range" min="200000" max="600000" step="50000" value={opex} onChange={(e) => setOpex(parseFloat(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd', height: 'fit-content' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px' }}>Year 5 EBITDA</p>
                    <p style={{ color: '#cc0000', fontSize: '36px', fontWeight: '600', margin: '0 0 20px' }}>${(sensitivityResult / 1000).toFixed(0)}K</p>
                    <button onClick={downloadSensitivity} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', fontWeight: '600', width: '100%' }}>⬇️ Download Template</button>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'tools-breakeven' && (
              <div>
                <h2 style={{ color: '#666', marginBottom: '20px' }}>Break-Even Analysis</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Fixed Costs</label>
                    <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(parseFloat(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Price Per Unit</label>
                    <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(parseFloat(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '20px' }} />
                    
                    <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Variable Cost Per Unit</label>
                    <input type="number" value={variableCost} onChange={(e) => setVariableCost(parseFloat(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                  <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #ddd', height: 'fit-content' }}>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px' }}>Break-Even Units</p>
                    <p style={{ color: '#cc0000', fontSize: '32px', fontWeight: '600', margin: '0 0 20px' }}>{breakEvenUnits.toLocaleString()}</p>
                    <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px' }}>Break-Even Revenue</p>
                    <p style={{ color: '#333', fontSize: '24px', fontWeight: '600', margin: '0' }}>${breakEvenRevenue}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentPage === 'learn' && (
          <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Learning Resources</h1>
            {['Scenario Analysis', 'Sensitivity Analysis', 'M&A Analysis', 'DCF Fundamentals', 'Financial Statements'].map((topic, i) => (
              <div key={i} style={{ background: '#f9f9f9', border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
                <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>{topic}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Professional guide on {topic.toLowerCase()} for financial decision-making.</p>
              </div>
            ))}
          </div>
        )}

        {currentPage === 'resources' && (
          <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Templates & Downloads</h1>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { name: 'DCF Model', icon: '📊', onClick: downloadDCF },
                { name: 'Scenario Analysis', icon: '🎯', onClick: downloadScenario },
                { name: 'Sensitivity Analysis', icon: '🎚️', onClick: downloadSensitivity },
                { name: 'M&A Analysis', icon: '🤝', onClick: downloadMnA }
              ].map((template, i) => (
                <div key={i} style={{ background: '#f9f9f9', border: '1px solid #ddd', borderLeft: '4px solid #cc0000', padding: '20px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#cc0000', margin: '0 0 8px' }}>{template.icon} {template.name}</h3>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Download and customize in Excel</p>
                  </div>
                  <button onClick={template.onClick} style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', fontWeight: '600', whiteSpace: 'nowrap' }}>⬇️ Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>About ModelCore Analytics</h1>
            <h3 style={{ color: '#cc0000' }}>Our Mission</h3>
            <p style={{ color: '#666', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '20px' }}>"At ModelCore Analytics, our mission is to eliminate the frustrating legwork of financial modeling by delivering professional financial data that is easy to understand and easy to present to any audience."</p>
            <h3 style={{ color: '#cc0000' }}>Who We Serve</h3>
            <ul style={{ color: '#666', lineHeight: '1.8' }}>
              <li><strong>Startups</strong> navigating growth and fundraising</li>
              <li><strong>Students</strong> building analytical skills</li>
              <li><strong>Companies</strong> evaluating strategic transactions</li>
            </ul>
          </div>
        )}

        {currentPage === 'contact' && (
          <div style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#cc0000', fontSize: '36px', marginBottom: '40px' }}>Get in Touch</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out!'); }} style={{ display: 'grid', gap: '20px' }}>
              <input type="text" placeholder="Name" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
              <input type="email" placeholder="Email" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
              <input type="text" placeholder="Company" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <textarea placeholder="Message" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '120px' }} required />
              <button type="submit" style={{ background: '#cc0000', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '4px' }}>Send Message</button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#0a0a0a', color: '#666', padding: '30px 40px', textAlign: 'center', fontSize: '12px', marginTop: '60px', borderTop: '1px solid #ddd' }}>
        <p style={{ margin: '0 0 10px' }}>© 2024 ModelCore Analytics. All rights reserved.</p>
        <p style={{ margin: '0' }}>Precision financial modeling. Clear insights. Easy to present.</p>
      </footer>
    </div>
  );
}