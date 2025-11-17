import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { useI18n } from '../hooks/useI18n';
// FIX: Removed the import for 'ShieldCheck' as it is not an exported member of the module.
import { Database, KeyRound, Code } from './LucideIcons';

const Section: React.FC<{ title: string; description: string; children: React.ReactNode; }> = ({ title, description, children }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <div className="p-4 prose prose-sm sm:prose-base prose-invert max-w-none prose-pre:bg-gray-800/50 prose-pre:text-gray-200 prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-table:w-full prose-th:p-2 prose-th:bg-gray-800/50 prose-td:p-2 prose-td:border-gray-700">
            {children}
        </div>
    </Card>
);

const CodeBlock: React.FC<{ language: string; children: string; }> = ({ language, children }) => (
    <pre><code className={`language-${language}`}>{children.trim()}</code></pre>
);

const nodeEnv = `
SUPABASE_URL=https://nyuiypkvveeimqwtsmnz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
`;

const nodeClient = `
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
`;

const nodeUsage = `
import { supabase } from './supabaseClient';

async function getItems() {
  const { data, error } = await supabase
    .from('items')
    .select('*');
  
  if (error) console.error('Error fetching items:', error);
  else console.log('Items:', data);
}
`;

const pythonEnv = `
SUPABASE_URL="https://nyuiypkvveeimqwtsmnz.supabase.co"
SUPABASE_KEY="YOUR_SERVICE_ROLE_KEY"
`;

const pythonClient = `
import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
`;

const pythonUsage = `
from supabase_client import supabase

def get_items():
    response = supabase.table('items').select("*").execute()
    if response.data:
        print(response.data)
    # Handle errors appropriately in production
`;

const rlsEnable = `ALTER TABLE items ENABLE ROW LEVEL SECURITY;`;
const rlsSelect = `CREATE POLICY "Allow authenticated read access" ON items FOR SELECT TO authenticated USING (true);`;
const rlsInsert = `CREATE POLICY "Allow individual insert access" ON items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);`;
const rlsUpdate = `CREATE POLICY "Allow individual update access" ON items FOR UPDATE TO authenticated USING (auth.uid() = user_id);`;
const rlsDelete = `CREATE POLICY "Allow individual delete access" ON items FOR DELETE TO authenticated USING (auth.uid() = user_id);`;

const curlGet = `curl -X GET 'YOUR_API_URL/items' -H 'Authorization: Bearer YOUR_JWT'`;
const curlPost = `curl -X POST 'YOUR_API_URL/items' -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_JWT' -d '{"name": "New Item", "user_id": "USER_UUID"}'`;

export const SupabaseGuide: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">{t('supabaseGuide.title')}</CardTitle>
                    <CardDescription>{t('supabaseGuide.description')}</CardDescription>
                </CardHeader>
            </Card>

            <Section title={t('supabaseGuide.prompt1_title')} description={t('supabaseGuide.prompt1_desc')}>
                <p><strong>{t('supabaseGuide.prompt1_step1')}:</strong> {t('supabaseGuide.prompt1_step2')}</p>
                <p>{t('supabaseGuide.prompt1_step3')}</p>
                <table>
                    <thead>
                        <tr>
                            <th>{t('supabaseGuide.prompt1_table_key')}</th>
                            <th>{t('supabaseGuide.prompt1_table_purpose')}</th>
                            <th>{t('supabaseGuide.prompt1_table_security')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>{t('supabaseGuide.prompt1_url')}</strong></td>
                            <td>{t('supabaseGuide.prompt1_url_desc')}</td>
                            <td><span className="text-green-400">{t('supabaseGuide.prompt1_url_sec')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>{t('supabaseGuide.prompt1_anon')}</strong></td>
                            <td>{t('supabaseGuide.prompt1_anon_desc')}</td>
                            <td><span className="text-green-400">{t('supabaseGuide.prompt1_anon_sec')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>{t('supabaseGuide.prompt1_service')}</strong></td>
                            <td>{t('supabaseGuide.prompt1_service_desc')}</td>
                            <td><span className="text-red-400">{t('supabaseGuide.prompt1_service_sec')}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Section>
            
            <Section title={t('supabaseGuide.prompt2_title')} description={t('supabaseGuide.prompt2_desc')}>
                <h4>{t('supabaseGuide.prompt2_nodejs')} / {t('supabaseGuide.prompt2_nextjs')}</h4>
                <p><strong>{t('supabaseGuide.prompt2_env_file')}:</strong></p>
                <CodeBlock language="bash">{nodeEnv}</CodeBlock>
                <p><strong>{t('supabaseGuide.prompt2_client_file')} (e.g., `lib/supabaseClient.js`):</strong></p>
                <CodeBlock language="javascript">{nodeClient}</CodeBlock>
                <p><strong>{t('supabaseGuide.prompt2_usage_example')}:</strong></p>
                <CodeBlock language="javascript">{nodeUsage}</CodeBlock>

                <h4 className="mt-6">{t('supabaseGuide.prompt2_python')}</h4>
                <p><strong>{t('supabaseGuide.prompt2_env_file')}:</strong></p>
                <CodeBlock language="bash">{pythonEnv}</CodeBlock>
                 <p><strong>{t('supabaseGuide.prompt2_client_file')} (e.g., `supabase_client.py`):</strong></p>
                <CodeBlock language="python">{pythonClient}</CodeBlock>
                <p><strong>{t('supabaseGuide.prompt2_usage_example')}:</strong></p>
                <CodeBlock language="python">{pythonUsage}</CodeBlock>
                
                <h4 className="mt-6">{t('supabaseGuide.prompt2_key_comparison')}</h4>
                <table>
                     <thead>
                        <tr>
                            <th>{t('supabaseGuide.prompt2_table_key_type')}</th>
                            <th>{t('supabaseGuide.prompt2_table_use_case')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>{t('supabaseGuide.prompt1_anon')}</strong></td>
                            <td>{t('supabaseGuide.prompt2_anon_use')}</td>
                        </tr>
                        <tr>
                            <td><strong>{t('supabaseGuide.prompt1_service')}</strong></td>
                            <td>{t('supabaseGuide.prompt2_service_use')}</td>
                        </tr>
                    </tbody>
                </table>
            </Section>

            <Section title={t('supabaseGuide.prompt3_title')} description={t('supabaseGuide.prompt3_desc')}>
                <h5>{t('supabaseGuide.prompt3_enable_rls')}</h5>
                <p>{t('supabaseGuide.prompt3_enable_rls_desc')}</p>
                <CodeBlock language="sql">{rlsEnable}</CodeBlock>

                <h5>{t('supabaseGuide.prompt3_policies')}</h5>
                <p>{t('supabaseGuide.prompt3_policies_desc')}</p>
                <h6>{t('supabaseGuide.prompt3_select_policy')}</h6>
                <p>{t('supabaseGuide.prompt3_select_desc')}</p>
                <CodeBlock language="sql">{rlsSelect}</CodeBlock>
                <h6>{t('supabaseGuide.prompt3_insert_policy')}</h6>
                <p>{t('supabaseGuide.prompt3_insert_desc')}</p>
                <CodeBlock language="sql">{rlsInsert}</CodeBlock>
                <h6>{t('supabaseGuide.prompt3_update_policy')}</h6>
                <p>{t('supabaseGuide.prompt3_update_desc')}</p>
                <CodeBlock language="sql">{rlsUpdate}</CodeBlock>
                 <h6>{t('supabaseGuide.prompt3_delete_policy')}</h6>
                <p>{t('supabaseGuide.prompt3_delete_desc')}</p>
                <CodeBlock language="sql">{rlsDelete}</CodeBlock>
            </Section>

            <Section title={t('supabaseGuide.prompt4_title')} description={t('supabaseGuide.prompt4_desc')}>
                <h5>{t('supabaseGuide.prompt4_token_security')}</h5>
                <p>{t('supabaseGuide.prompt4_token_security_desc')}</p>
                <h5>{t('supabaseGuide.prompt4_testing')}</h5>
                <p>{t('supabaseGuide.prompt4_testing_desc')}</p>
                <CodeBlock language="bash">{curlGet}</CodeBlock>
                <CodeBlock language="bash">{curlPost}</CodeBlock>
            </Section>
            
            <Section title={t('supabaseGuide.prompt5_title')} description={t('supabaseGuide.prompt5_desc')}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('supabaseGuide.prompt5_table_item')}</th>
                            <th>{t('supabaseGuide.prompt5_table_action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>{t('supabaseGuide.prompt5_api')}</td><td>{t('supabaseGuide.prompt5_api_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_token')}</td><td>{t('supabaseGuide.prompt5_token_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_rls')}</td><td>{t('supabaseGuide.prompt5_rls_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_policy')}</td><td>{t('supabaseGuide.prompt5_policy_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_log')}</td><td>{t('supabaseGuide.prompt5_log_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_connection')}</td><td>{t('supabaseGuide.prompt5_connection_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_deploy')}</td><td>{t('supabaseGuide.prompt5_deploy_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_index')}</td><td>{t('supabaseGuide.prompt5_index_action')}</td></tr>
                        <tr><td>{t('supabaseGuide.prompt5_backup')}</td><td>{t('supabaseGuide.prompt5_backup_action')}</td></tr>
                    </tbody>
                </table>
            </Section>
        </div>
    );
};
