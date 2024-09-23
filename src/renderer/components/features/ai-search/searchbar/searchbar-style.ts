export const mentionInListStyle = {
  control: {
    // fontSize: 14,
    // fontWeight: 'normal',
    // color: 'black',

    paddingTop: 10,
    paddingLeft: 20,
  },

  '&singleLine': {
    marginTop: 10,
    display: 'inline-block',
    width: '100%',

    // Removed all style properies
    highlighter: {
      padding: 1,
      border: 'unset',
    },
    input: {
      fontSize: 14,
      backgroundColor: 'white',
      paddingLeft: 20,
      paddingRight: 60, // Add right padding to accommodate the button
      outline: 'none', // Add this line to remove the focus ring
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '2rem',
      height: 40,
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      borderRadius: '0.2rem',
    },
    item: {
      borderRadius: '0rem',
      padding: '5px 5px',
      '&focused': {
        backgroundColor: '#d1edfd',
      },
    },
  },
};

export const mentionInInputStyle = {
  backgroundColor: '#d1edfd',
  paddingTop: 4,
};
