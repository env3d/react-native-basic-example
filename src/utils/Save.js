
export default async function save(token, output) {
  console.log('saving to google drive');

  let query = encodeURIComponent(`name = "MyScans"`);
  let res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });  

  let json = await res.json();
  console.log('searching for MyScans folder', json);
  
  let folderId;
  if (json.files.length > 0) {  
    folderId = json.files[0].id
  } else {
    // create the folder
    res = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'MyScans',
        mimeType: 'application/vnd.google-apps.folder'
      })
    });

    json = await res.json();
    
    console.log('creating folder', json);
    folderId = json.id
  } 

  console.log(`folder id is ${folderId}`);
  
  
  const META = {
    name: "scan",
    parents: [folderId]
  }
  
  const BOUNDARY = 'BOUNDARY*****BOUNDARY****BOUNDARY';
  const BODY = [
    `--${BOUNDARY}`,
    'Content-Type: application/json',
    '',
    JSON.stringify(META),
    '',
    `--${BOUNDARY}`,
    'Content-Type: text/plain',
    '',
    output,
    '',
    `--${BOUNDARY}--`,
  ].join('\n');

  console.log('calling api');
  res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/related; boundary=${BOUNDARY}`,
      'Authorization': `Bearer ${token}`
    },
    body: BODY
  });

  json = await res.json();
  console.log(json);
  
  return json;
}
