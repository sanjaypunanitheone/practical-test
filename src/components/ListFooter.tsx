import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '../utils/theme/colors';

interface ListFooterProps {
  isLoading: boolean;
}

const ListFooter: React.FC<ListFooterProps> = ({isLoading}) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.DARK_GREY} />;
  }
  return null;
};

export default ListFooter;
