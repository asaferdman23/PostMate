import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS SDK
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION, // Change to your region
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Function to get items from DynamoDB
export const getEmails = async () => {
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
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    throw err;
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

export const query = async (filterBy) => {
  try {
    const emails = await getEmails(); // Get all emails first
    
    // Filter by status (mailStatus)
    let filteredEmails = emails;
    if (filterBy.mail) {
      filteredEmails = emails.filter(email => {
        if (filterBy.mail === 'inbox') return email.status === 'received';
        if (filterBy.mail === 'sent') return email.status === 'sent';
        if (filterBy.mail === 'draft') return email.status === 'draft';
        if (filterBy.mail === 'trash') return email.status === 'trash';
        return true; // If no status filter, return all emails
      });
    }

    // Filter by search string (if exists)
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
    throw err;
  }
};

export const emailService = {
  getEmails,
  addEmail,
  updateEmail,
  uploadFile,
  query
}

