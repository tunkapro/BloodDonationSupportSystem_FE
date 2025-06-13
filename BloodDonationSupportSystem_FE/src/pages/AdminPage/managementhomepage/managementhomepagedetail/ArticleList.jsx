import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

export default function ArticleList({ articles, types, onEdit, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tiêu đề</TableCell>
          <TableCell>Loại</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell>Ảnh</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {articles.map((a) => (
          <TableRow key={a.article_id}>
            <TableCell>{a.title}</TableCell>
            <TableCell>{types.find(t => t.article_type_id === a.type_id)?.name}</TableCell>
            <TableCell>{a.status}</TableCell>
            <TableCell><img src={a.picture} alt="" width={80} /></TableCell>
            <TableCell>
              <Button onClick={() => onEdit(a)}>Sửa</Button>
              <Button onClick={() => onDelete(a.article_id)} color="error">Xóa</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
