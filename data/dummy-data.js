import Category from '../models/category';
import Meal from '../models/meal';

export const CATEGORIES = [
  new Category('c1', 'Najwan', '#589D84'),
  new Category('c2', 'Abdullah', '#589D84'),
  new Category('c3', 'Abdelrahman', '#589D84'),
  new Category('c4', 'Shehab', '#589D84'),

];
export const CATEGORIESHOME = [
  new Category('D1', 'My Uploads', '#589D84'),
  new Category('D2', 'Hospitals', '#589D84'),
  new Category('D3', 'Shared', '#589D84'),
];
export const UploadText = [
  new Category('E1', 'Select PDF to Upload', '#589D84'),
  new Category('E2', 'Select Image to Upload', '#589D84'),
  new Category('E3', 'Upload selected Document', '#589D84'),
];

export const MEALS = [
  new Meal(
    'm1',
    ['c1', 'c2','c3','c4'],
    'Document Name',
    'Blood Test',
    '',
    5,
    [
      'Main Document Points',

    ],
    [
      'Document Main Info'
    ],
    false,
    true,
    true,
  ),
  new Meal(
    'm2',
    ['c1', 'c2','c3','c4'],
    'Document Name',
    'Blood Test',
    '',
    5,
    [
      'Main Document Points',

    ],
    [
      'Document Main Info'
    ],
    false,
    true,
    true,
  ),
  new Meal(
    'm3',
    ['c1', 'c2','c3','c4'],
    'Document Name',
    'Blood Test',
    '',
    5,
    [
      'Main Document Points',

    ],
    [
      'Document Main Info'
    ],
    false,
    true,
    true,
  ),


];