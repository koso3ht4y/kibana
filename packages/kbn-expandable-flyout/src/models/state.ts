/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FlyoutPanel } from '../..';

export interface FlyoutState {
  /**
   * Object storing all the panels with the panel id being the key
   */
  byId: { [panelId: string]: FlyoutPanel };
  /**
   * Array storing ids of all the left panels
   */
  leftIds: string[];
  /**
   * Array storing ids of all the right panels
   */
  rightIds: string[];
  /**
   * Array storing ids of all the preview panels
   */
  previewIds: string[];
  /**
   * Object storing ids of all panels by scope
   */
  idsByScope: { [scopeId: string]: string[] };
  /**
   * Array storing all ids of all panels
   */
  allIds: string[];
}

export const initialFlyoutState: FlyoutState = {
  byId: {},
  leftIds: [],
  rightIds: [],
  previewIds: [],
  idsByScope: {},
  allIds: [],
};
