/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { RouteComponentProps } from "react-router";

export type UrlProps<T extends string> = { [K in T]: string|null };

export function setTenantIdInUrl(props: RouteComponentProps, tenantId: number) {
  const endOfTenantId = props.location.pathname.indexOf('/', 1);
  if (endOfTenantId !== -1) {
    props.history.push(`/${tenantId}${props.location.pathname
      .slice(props.location.pathname.indexOf('/', 1))}`);
  }
  // Else, the page is not specific to a tenant, so we do nothing
}

export function getPropsFromUrl<T extends UrlProps<string> >(props: RouteComponentProps, defaultValues: T): T {
  const searchParams = new URLSearchParams(props.location.search);
  const out: { [index: string]: string|null }  = { ...defaultValues };
  
  searchParams.forEach((value, key) => out[key] = value);
  
  return out as T;
}

export function setPropsInUrl<T extends UrlProps<string> >(props: RouteComponentProps, urlProps: Partial<T>) {
  const searchParams = new URLSearchParams(props.location.search);
  for (const key in urlProps) {
    const value = urlProps[key] as string|null|undefined;
    if (value !== undefined) {
      if (value !== null && value.length > 0) {
        searchParams.set(key, value);
      }
      else {
        searchParams.delete(key);
      }
    }
  }
  props.history.push(`${props.location.pathname}?${searchParams.toString()}`);
}