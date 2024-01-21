import React from 'react';
import './styles.css';
import AppRouter from './appRouter';
import Footer from '../components/Footer';
import SideBar from '../components/sideBar';
import Player from '../components/Player';


const ResizableColumn = ({ WrappedComponent, props }) => {
  const [leftColumnWidth, setLeftColumnWidth] = React.useState(280);

  const handleResize = e => {
    const newWidth = Math.min(Math.max(e.clientX, window.innerWidth * 0.16), window.innerWidth * 0.26);
    setLeftColumnWidth(newWidth);
  };

  return (
    <div className='resize'
      style={{
        flex: `0 0 ${leftColumnWidth}px`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          cursor: leftColumnWidth <= window.innerWidth * 0.3 - 10 && leftColumnWidth > window.innerWidth * 0.15 ? 'e-resize' : 'auto',
          // height: '100%',
          padding: '0px',
        }}
        onMouseDown={e => {
          document.addEventListener('mousemove', handleResize);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleResize);
          });
        }}
      >
        <WrappedComponent {...props} />
      </div>
    </div>
  );
};

const withLayout = WrappedComponent => {
  return props => (
    <div className='grand-parent'>
      <div className='parent'>
        <ResizableColumn WrappedComponent={SideBar} props={props} />

        <div className='enfant'>
          <WrappedComponent />
        </div>
      </div>
      <div className='pied'>
        {/* <Footer /> */}
        {/* <Player /> */}
      </div>
    </div>
  );
};

const AppWithLayout = withLayout(AppRouter);

export default AppWithLayout;
