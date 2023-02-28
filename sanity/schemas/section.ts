import { orderRankField } from '@sanity/orderable-document-list';

export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    orderRankField({
      type: 'section',
    }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'option',
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
