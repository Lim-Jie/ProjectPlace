// components/Tabs.js
'use client';
import { useState } from 'react';
import styles from './Tabs.module.css'; // Import CSS module
import StartupForm from './FormStartup';
import ProjectForm from './FormProject';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'tab1' ? styles.active : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          Startup
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tab2' ? styles.active : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          Projects
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tab3' ? styles.active : ''}`}
          onClick={() => handleTabClick('tab3')}
        >
          FYP
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tab4' ? styles.active : ''}`}
          onClick={() => handleTabClick('tab4')}
        >
          Master Research/PHD
        </button>
      </div>


      <div className={styles.content}>
        {activeTab === 'tab1' && <StartupForm />}
        {activeTab === 'tab2' && <ProjectForm/>}
        {activeTab === 'tab3' && <div>Content for Tab 3</div>}
        {activeTab === 'tab4' && <div>Content for Tab 4 </div>}
      </div>
    </div>
  );
};

export default Tabs;
