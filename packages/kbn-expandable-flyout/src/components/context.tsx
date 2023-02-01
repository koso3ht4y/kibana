/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { noop } from 'lodash/fp';
import type { FlyoutLayout } from '../models/layout';
import type { FlyoutPanel } from '../models/panel';
import { FlyoutState, initialFlyoutState } from '../models/state';
import {
  closeFlyout,
  closeFlyoutLeftPanel,
  closeFlyoutPreviewPanel,
  closeFlyoutRightPanel,
  openFlyout,
  openFlyoutLeftPanel,
  openFlyoutPreviewPanel,
  openFlyoutRightPanel,
  previousFlyoutPreviewPanel,
  selectFlyoutLayout,
} from '../utils/helpers';

export interface ExpandableFlyoutContext {
  /**
   *
   */
  panels: FlyoutLayout;
  /**
   *
   */
  scope: string;
  /**
   *
   */
  openPanels: (panels: { left?: FlyoutPanel; right?: FlyoutPanel; preview?: FlyoutPanel }) => void;
  /**
   *
   */
  openRightPanel: (panel: FlyoutPanel) => void;
  /**
   *
   */
  openLeftPanel: (panel: FlyoutPanel) => void;
  /**
   *
   */
  openPreviewPanel: (panel: FlyoutPanel) => void;
  /**
   *
   */
  closeRightPanel: () => void;
  /**
   *
   */
  closeLeftPanel: () => void;
  /**
   *
   */
  closePreviewPanel: () => void;
  /**
   *
   */
  previousPreviewPanel: () => void;
  /**
   *
   */
  closePanels: () => void;
}

export const ExpandableFlyoutContext = createContext<ExpandableFlyoutContext>({
  panels: {
    left: {},
    right: {},
    preview: [],
  },
  scope: '',
  openPanels: noop,
  openRightPanel: noop,
  openLeftPanel: noop,
  openPreviewPanel: noop,
  closeRightPanel: noop,
  closeLeftPanel: noop,
  closePreviewPanel: noop,
  closePanels: noop,
  previousPreviewPanel: noop,
});

export interface ExpandableFlyoutProviderProps {
  /**
   *
   */
  scope: string;
  /**
   *
   */
  children: React.ReactNode;
}

export const ExpandableFlyoutProvider = ({ scope, children }: ExpandableFlyoutProviderProps) => {
  const [state, setState] = useState<FlyoutState>(initialFlyoutState);

  const openPanels = useCallback(
    ({
      right,
      left,
      preview,
    }: {
      right?: FlyoutPanel;
      left?: FlyoutPanel;
      preview?: FlyoutPanel;
    }) => setState(openFlyout(state, { scope, left, right, preview })),
    [state, scope]
  );

  const openRightPanel = useCallback(
    (panel: FlyoutPanel) => setState(openFlyoutRightPanel(state, { scope, panel })),
    [state, scope]
  );

  const openLeftPanel = useCallback(
    (panel: FlyoutPanel) => setState(openFlyoutLeftPanel(state, { scope, panel })),
    [state, scope]
  );

  const openPreviewPanel = useCallback(
    (panel: FlyoutPanel) => setState(openFlyoutPreviewPanel(state, { scope, panel })),
    [state, scope]
  );

  const closeRightPanel = useCallback(
    () => setState(closeFlyoutRightPanel(state, { scope })),
    [state, scope]
  );

  const closeLeftPanel = useCallback(
    () => setState(closeFlyoutLeftPanel(state, { scope })),
    [state, scope]
  );

  const closePreviewPanel = useCallback(
    () => setState(closeFlyoutPreviewPanel(state, { scope })),
    [state, scope]
  );

  const previousPreviewPanel = useCallback(
    () => setState(previousFlyoutPreviewPanel(state, { scope })),
    [state, scope]
  );

  const closePanels = useCallback(() => setState(closeFlyout(state, { scope })), [state, scope]);

  const contextValue = useMemo(
    () => ({
      panels: selectFlyoutLayout(state, scope),
      scope,
      openPanels,
      openRightPanel,
      openLeftPanel,
      openPreviewPanel,
      closeRightPanel,
      closeLeftPanel,
      closePreviewPanel,
      closePanels,
      previousPreviewPanel,
    }),
    [
      state,
      scope,
      openPanels,
      openRightPanel,
      openLeftPanel,
      openPreviewPanel,
      closeRightPanel,
      closeLeftPanel,
      closePreviewPanel,
      closePanels,
      previousPreviewPanel,
    ]
  );

  return (
    <ExpandableFlyoutContext.Provider value={contextValue}>
      {children}
    </ExpandableFlyoutContext.Provider>
  );
};

export const useExpandableFlyoutContext = () =>
  useContext<NonNullable<ExpandableFlyoutContext>>(ExpandableFlyoutContext);
