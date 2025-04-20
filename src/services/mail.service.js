import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Add error handling for missing credentials
const getAwsConfig = () => {
  const region = import.meta.env.VITE_AWS_REGION;
  const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    console.error('AWS credentials not found');
    return null;
  }

  return {
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  };
};

// Initialize clients with error handling
const awsConfig = getAwsConfig();
const client = awsConfig ? new DynamoDBClient(awsConfig) : null;
const s3Client = awsConfig ? new S3Client(awsConfig) : null;

// Add error handling to getEmails
export const getEmails = async () => {
  if (!client) {
    console.error('DynamoDB client not initialized');
    return [];  // Return empty array instead of throwing error
  }

  const params = {
    TableName: 'emails'
  };

  try {
    const data = await client.send(new ScanCommand(params));
    return data.Items.map(item => ({
      emailId: item.emailId.S,
      sender: item.sender.S,
      receiver: item.receiver.S,
      subject: item.subject.S,
      body: item.body.S,
      status: item.status.S,
    }));
  } catch (err) {
    console.error("Unable to scan the table:", err);
    return [];  // Return empty array on error
  }
};

export const addEmail = async (email) => {
  const params = {
    TableName: 'emails',
    Item: {
      emailId: { S: email.emailId },
      sender: { S: email.sender },
      receiver: { S: email.receiver },
      subject: { S: email.subject },
      body: { S: email.body },
      status: { S: email.status },
    }
  };

  try {
    await client.send(new PutItemCommand(params));
    console.log('Email added:', email);
  } catch (err) {
    console.error('Error adding email:', err);
  }
}

export const updateEmail = async (email) => {
  const params = {
    TableName: 'emails',
    Item: email
  };

  try {
    await client.send(new PutItemCommand(params));
    console.log('Email added:', email);
  } catch (err) {
    console.error('Error adding email:', err);
  }
}

async function uploadFile(file) {
  const params = {
    Bucket: 'emails-list123',
    Key: file.name,
    Body: file,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully');
  } catch (err) {
    console.error('Error uploading file:', err);
  }
}

const getDefaultFilter = () => ({
  mail: 'inbox',
  searchstr: ''
});

export const query = async (filterBy = getDefaultFilter()) => {
  try {
    const emails = await getEmails();
    
    if (!emails || !Array.isArray(emails)) {
      console.warn('No emails returned from getEmails');
      return [];
    }
    
    let filteredEmails = emails;
    
    if (filterBy.mail) {
      filteredEmails = emails.filter(email => {
        switch(filterBy.mail) {
          case 'inbox': return email.status === 'received';
          case 'sent': return email.status === 'sent';
          case 'draft': return email.status === 'draft';
          case 'trash': return email.status === 'trash';
          default: return true;
        }
      });
    }

    if (filterBy.searchstr) {
      const searchStr = filterBy.searchstr.toLowerCase();
      filteredEmails = filteredEmails.filter(email => 
        email.subject?.toLowerCase().includes(searchStr) ||
        email.body?.toLowerCase().includes(searchStr) ||
        email.sender?.toLowerCase().includes(searchStr) ||
        email.receiver?.toLowerCase().includes(searchStr)
      );
    }

    return filteredEmails;
  } catch (err) {
    console.error('Error querying emails:', err);
    return []; // Return empty array instead of throwing
  }
};

export const emailService = {
  getEmails,
  addEmail,
  updateEmail,
  uploadFile,
  query,
  getDefaultFilter
};

