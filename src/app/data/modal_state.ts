export interface ModalState {
  filterModalOpen?: boolean;
  setFilterModalOpen?: (open: boolean) => void;
  spaceModalOpen?: boolean;
  setSpaceModalOpen?: (open: boolean) => void;
  fileModalOpen?: boolean;
  setFileModalOpen?: (open: boolean) => void;
  nodeModalOpen?: boolean;
  setNodeModalOpen?: (open: boolean) => void;
}
