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

  const handleChange = e =>
    setDumbForm({ ...dumbForm, [e.target.name]: e.target.value });

  if (success) {
    return (
      <Box>
        We will reach out to you on Discord for some additional details. In the
        meantime, please swing by the Tavern 🍻 on the Y33T Discord server and
        share what you are up to..
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={5}>
        We are running a concierge program to roll out the next batch of
        projects on our platform. If you are interested in funding your project
        with Yeeter, please fill out the form below.
      </Box>
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
        Project tl;dr
        <Textarea
          name='projectTldr'
          value={dumbForm.projectTldr}
          onChange={handleChange}
        />
      </Box>
      <Box mb={3}>
        Desired Launch Date
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
      <Box mt={5}>
        <Button onClick={handleSubmit}>Y33T!</Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
