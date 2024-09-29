export const getMentionInListStyle = ({
  isFocused,
}: {
  isFocused: boolean;
}) => {
  return {
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
        boxShadow:
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:focus': {
          boxShadow:
            '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        },
        fontSize: 14,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 60, // Add right padding to accommodate the button
        outline: 'none', // Add this line to remove the focus ring
        border: isFocused
          ? '0.5px solid #4A7F8F'
          : '1px solid rgba(0,0,0,0.08)',
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
};

export const mentionInInputStyle = {
  backgroundColor: '#d1edfd',
  paddingTop: 4,
};
