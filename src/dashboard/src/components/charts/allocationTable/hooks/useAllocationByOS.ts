import { IServerItemModel } from '@/hooks';
import { useOperatingSystemItems, useTenants } from '@/hooks/data';
import React from 'react';
import { ITableRowData } from '../ITableRowData';
import { OperatingSystems } from '../constants';

/**
 * Provides a function to filter server items.
 * @param operatingSystem Operating system filter.
 * @returns Function to filter server items by operating system and predicate.
 */
export const useAllocationByOS = (operatingSystem: OperatingSystems) => {
  const { operatingSystemItems } = useOperatingSystemItems();
  const { tenants } = useTenants();

  return React.useCallback(
    (
      serverItems: IServerItemModel[],
      filter: (serverItem: IServerItemModel) => boolean = () => true,
      sort: keyof ITableRowData = 'server',
      direction: 'asc' | 'desc' = 'asc',
    ) => {
      const data = serverItems
        .map((si) => ({
          ...si,
          operatingSystemItem: operatingSystemItems.find((o) => o.id === si.operatingSystemItemId),
          tenant: tenants.find((t) => t.id === si.tenantId),
        }))
        .filter((si) => {
          const className = si.operatingSystemItem?.rawData.u_class;
          return className === operatingSystem && filter(si);
        })
        .map<ITableRowData>((si) => {
          return {
            server: si.name,
            os: si.operatingSystemItem?.name ?? '',
            tenant: si.tenant?.name ?? '',
            capacity: si.capacity ?? 0,
            available: si.availableSpace ?? 0,
          };
        })
        .sort((a, b) => {
          const order = direction === 'asc' ? 1 : -1;
          if (sort === 'server') {
            return (a.server < b.server ? -1 : a.server > b.server ? 1 : 0) * order;
          } else if (sort === 'os') {
            return (a.os < b.os ? -1 : a.os > b.os ? 1 : 0) * order;
          } else if (sort === 'tenant') {
            return (a.tenant < b.tenant ? -1 : a.tenant > b.tenant ? 1 : 0) * order;
          } else if (sort === 'capacity') {
            return (a.capacity < b.capacity ? -1 : a.capacity > b.capacity ? 1 : 0) * order;
          } else if (sort === 'available') {
            return (a.available < b.available ? -1 : a.available > b.available ? 1 : 0) * order;
          }
          return a.server < b.server ? -1 : a.server > b.server ? 1 : 0;
        });

      return data;
    },
    [operatingSystem, operatingSystemItems, tenants],
  );
};