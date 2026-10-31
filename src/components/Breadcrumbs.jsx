import React from 'react';
import { breadcrumbsFor, href } from '../lib/catalog';

export default function Breadcrumbs({ page }) {
  const crumbs = breadcrumbsFor(page);
  if (!crumbs.length) return null;
  return <nav className="breadcrumb" aria-label="Breadcrumb"><ol>{crumbs.map((crumb,i) => <li key={crumb.route}>{i === crumbs.length-1 ? <span aria-current="page">{crumb.name}</span> : <a href={href(crumb.route)}>{crumb.name}</a>}</li>)}</ol></nav>;
}
