import React, { useState } from 'react';
import { Box, Input, Textarea, Button } from '@chakra-ui/react';

const encode = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
};

const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const [dumbForm, setDumbForm] = useState({
    projectTitle: '',
    projectTldr: '',
    launchDate: '',
    firstName: '',
    discordUsername: '',
    message: '',
  });
  const handleSubmit = async () => {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'yeeter-form', ...dumbForm }),
    });

    console.log('res', res);

    if (res.ok) {
      setSuccess(true);
    }
  };

  const handleChange = e => setDumbForm({ [e.target.name]: e.target.value });

  if (success) {
    return <Box>Success! Feel free to reach out in Discord.</Box>;
  }

  return (
    <Box>
      <Box mb={3}>
        Project Title
        <Input
          type='text'
          name='projectTitle'
          value={dumbForm.projectTitle}
          onChange={handleChange}
        />
      </Box>
      <Box mb={3}>
        Project TLDR
        <Textarea
          name='projectTldr'
          value={dumbForm.projectTldr}
          onChange={handleChange}
        />
      </Box>
      <Box mb={3}>
        Launch Date
        <Input
          type='date'
          name='launchDate'
          value={dumbForm.launchDate}
          onChange={handleChange}
        />
      </Box>
      <Box mb={3}>
        Discord Username
        <Input
          type='text'
          name='discordUsername'
          value={dumbForm.discordUsername}
          onChange={handleChange}
        />
      </Box>
      <Box mb={3}>
        Message
        <Textarea
          name='message'
          value={dumbForm.message}
          onChange={handleChange}
        />
      </Box>
      <Box mt={5}>
        <Button onClick={handleSubmit}>Send</Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
