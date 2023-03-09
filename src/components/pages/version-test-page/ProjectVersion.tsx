import React, { useCallback, useContext, useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import ApiService from '../../../api/ApiService';
import { AppVersionContext } from '../../contexts/AppVersionContext';

const ProjectVersion = () => {
  const { version, setVersion } = useContext(AppVersionContext);
  const { palette } = useTheme();

  const fetchVersion = useCallback(async () => {
    try {
      const resp = await ApiService.getReq('/api/version/get-version?name=Create%20Skeleton');
      setVersion(resp.data.version);
    } catch (_) {
      //console.log(e.message);
    }
  }, []);

  useEffect(() => {
    fetchVersion();
  }, []);

  return version.length === 0 ? null : (
    <>
      {palette.mode === 'dark' ? null : (
        <Typography variant='h2' textAlign='center'>
          Welcome to Evozon Summer Internship!!
        </Typography>
      )}

      <Typography variant='h3' textAlign='center'>
        Version: {version}
      </Typography>
    </>
  );
};

export default ProjectVersion;
