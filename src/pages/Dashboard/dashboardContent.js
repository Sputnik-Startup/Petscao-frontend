import React from 'react';
import { FiHome } from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';

import { ContentContainer } from './styles';

function DashboardContent() {
  return (
    <ContentContainer>
      <ComponentHeader
        title="Dashboard"
        icon={<FiHome size={25} color="#fff" />}
      />
    </ContentContainer>
  );
}

export default DashboardContent;
