import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';

type StatusBadgeProps = {
  existencia: boolean;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ existencia }) => {
  return (
    <Badge
      variant={existencia ? "solid" : "outline"}
      className={
        existencia ? "bg-success-500" : "border-error-500"
      }
    >
      <Text
        className={`text-xs font-roboto ${
          existencia ? "text-white" : "text-error-500"
        }`}
      >
        {existencia ? "Disponible" : "Agotado"}
      </Text>
    </Badge>
  );
};

export default StatusBadge;
