import {
  IFileSystemItemModel,
  IOperatingSystemItemListModel,
  IOrganizationListModel,
  IServerItemListModel,
  ITenantListModel,
} from '@/hooks/api';
import { create } from 'zustand';

export interface IFilterValues {
  tenant?: ITenantListModel;
  organization?: IOrganizationListModel;
  operatingSystemItem?: IOperatingSystemItemListModel;
  serverItem?: IServerItemListModel;
}

export interface IFilteredStoreState {
  // Filter
  loading: boolean;
  setLoading: (value: boolean) => void;
  values: IFilterValues;
  setValues: (dispatch: (values: IFilterValues) => IFilterValues) => void;

  // Tenants
  tenantsReady?: boolean;
  setTenantsReady: (value?: boolean) => void;
  tenants: ITenantListModel[];
  setTenants: (values: ITenantListModel[]) => void;

  // Organizations
  organizationsReady?: boolean;
  setOrganizationsReady: (value?: boolean) => void;
  organizations: IOrganizationListModel[];
  setOrganizations: (values: IOrganizationListModel[]) => void;

  // Operating System Items
  operatingSystemItemsReady?: boolean;
  setOperatingSystemItemsReady: (value?: boolean) => void;
  operatingSystemItems: IOperatingSystemItemListModel[];
  setOperatingSystemItems: (values: IOperatingSystemItemListModel[]) => void;

  // Server Items
  serverItemsReady?: boolean;
  setServerItemsReady: (value?: boolean) => void;
  serverItems: IServerItemListModel[];
  setServerItems: (values: IServerItemListModel[]) => void;

  // File System Items
  fileSystemItemsReady?: boolean;
  setFileSystemItemsReady: (value?: boolean) => void;
  fileSystemItems: IFileSystemItemModel[];
  setFileSystemItems: (values: IFileSystemItemModel[]) => void;
}

export const useFilteredStore = create<IFilteredStoreState>((set, get) => ({
  // Filter
  loading: false,
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
  values: {},
  setValues: (dispatch: (values: IFilterValues) => IFilterValues) => {
    const values = dispatch(get().values);
    set((state) => ({ ...state, values: values ?? {} }));
  },

  // Tenants
  setTenantsReady: (value) => set((state) => ({ ...state, tenantsReady: value })),
  tenants: [],
  setTenants: (values) => set((state) => ({ ...state, tenants: values })),

  // Organizations
  setOrganizationsReady: (value) => set((state) => ({ ...state, organizationsReady: value })),
  organizations: [],
  setOrganizations: (values) => set((state) => ({ ...state, organizations: values })),

  // Operating System Items
  setOperatingSystemItemsReady: (value) =>
    set((state) => ({ ...state, operatingSystemItemsReady: value })),
  operatingSystemItems: [],
  setOperatingSystemItems: (values) => set((state) => ({ ...state, operatingSystemItems: values })),

  // Server Items
  setServerItemsReady: (value) => set((state) => ({ ...state, serverItemsReady: value })),
  serverItems: [],
  setServerItems: (values) => set((state) => ({ ...state, serverItems: values })),

  // File System Items
  setFileSystemItemsReady: (value) => set((state) => ({ ...state, fileSystemItemsReady: value })),
  fileSystemItems: [],
  setFileSystemItems: (values) => set((state) => ({ ...state, fileSystemItems: values })),
}));
