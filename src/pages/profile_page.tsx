import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Moon, Sun, PenTool, Send, BookOpen, Users, CheckCircle, XCircle, Clock, Search, ChevronLeft, ChevronRight, Power } from "lucide-react";
import { useAuth } from "@/contexts/auth_context";
import { useTheme } from "@/contexts/theme_context";
import { CATEGORIES } from "@/data/types";
import { mock_books } from "@/data/mock_books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const ProfilePage: React.FC = () => {
  const { user, update_profile, is_authenticated, author_requests, submit_author_request, book_submissions, submit_book, update_author_request, update_book_submission, all_users, toggle_user_active } = useAuth();
  const { is_dark, toggle_theme } = useTheme();
  const { toast } = useToast();

  // Profile form
  const [name, set_name] = useState(user?.name || "");
  const [email, set_email] = useState(user?.email || "");
  const [phone, set_phone] = useState(user?.phone || "");
  const [address, set_address] = useState(user?.address || "");
  const [avatar_url, set_avatar_url] = useState(user?.avatar_url || "");

  // Author request
  const [author_reason, set_author_reason] = useState("");

  // Book submission
  const [book_title, set_book_title] = useState("");
  const [book_synopsis, set_book_synopsis] = useState("");
  const [book_category, set_book_category] = useState<string>(CATEGORIES[0]);
  const [book_price, set_book_price] = useState("");
  const [book_cover, set_book_cover] = useState("");
  const [book_pages_text, set_book_pages_text] = useState("");

  // Admin - books
  const [books_search, set_books_search] = useState("");
  const [books_page, set_books_page] = useState(1);

  // Admin - users
  const [users_search, set_users_search] = useState("");
  const [users_page, set_users_page] = useState(1);

  // Admin - submissions
  const [submissions_search, set_submissions_search] = useState("");

  // Admin - author requests filter
  const [requests_filter, set_requests_filter] = useState<"all" | "pending">("pending");

  if (!is_authenticated || !user) return <Navigate to="/login" />;

  const handle_avatar_file = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      set_avatar_url(result);
    };
    reader.readAsDataURL(file);
  };

  const save_profile = () => {
    update_profile({ name, email, phone, address, avatar_url });
    toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas." });
  };

  const handle_author_request = () => {
    if (!author_reason.trim()) return;
    submit_author_request(author_reason);
    set_author_reason("");
    toast({ title: "Solicitação enviada!", description: "Aguarde a aprovação da administração." });
  };

  const handle_book_submit = () => {
    if (!book_title.trim() || !book_synopsis.trim() || !book_pages_text.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    const pages = book_pages_text.split("---").map((p) => p.trim()).filter(Boolean);
    submit_book({
      title: book_title,
      synopsis: book_synopsis,
      category: book_category,
      cover_url: book_cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      pages,
      price: parseFloat(book_price) || 0,
    });
    set_book_title(""); set_book_synopsis(""); set_book_pages_text(""); set_book_price(""); set_book_cover("");
    toast({ title: "Livro enviado!", description: "Seu livro foi enviado para aprovação." });
  };

  const user_request = author_requests.find((r) => r.user_id === user.id);
  const is_author = user.role === "author" || user.role === "admin";
  const is_admin = user.role === "admin";

  // Admin filtered data
  const filtered_books = mock_books.filter((b) =>
    b.title.toLowerCase().includes(books_search.toLowerCase()) || b.author.toLowerCase().includes(books_search.toLowerCase())
  );
  const books_total_pages = Math.ceil(filtered_books.length / ITEMS_PER_PAGE);
  const paginated_books = filtered_books.slice((books_page - 1) * ITEMS_PER_PAGE, books_page * ITEMS_PER_PAGE);

  const filtered_users = all_users.filter((u) =>
    u.name.toLowerCase().includes(users_search.toLowerCase()) || u.email.toLowerCase().includes(users_search.toLowerCase())
  );
  const users_total_pages = Math.ceil(filtered_users.length / ITEMS_PER_PAGE);
  const paginated_users = filtered_users.slice((users_page - 1) * ITEMS_PER_PAGE, users_page * ITEMS_PER_PAGE);

  const filtered_requests = author_requests.filter((r) => requests_filter === "all" || r.status === "pending");
  const filtered_submissions = book_submissions.filter((s) =>
    s.title.toLowerCase().includes(submissions_search.toLowerCase()) || s.author_name.toLowerCase().includes(submissions_search.toLowerCase())
  );

  const status_badge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
      approved: "bg-green-500/15 text-green-700 dark:text-green-400",
      rejected: "bg-red-500/15 text-red-700 dark:text-red-400",
    };
    const labels: Record<string, string> = { pending: "Pendente", approved: "Aprovado", rejected: "Rejeitado" };
    return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}>{labels[status]}</span>;
  };

  // Build tab list dynamically
  const tabs: { value: string; label: string; icon: React.ReactNode }[] = [
    { value: "profile", label: "Perfil", icon: <User className="h-4 w-4" /> },
  ];
  if (!is_author) {
    tabs.push({ value: "author", label: "Ser Autor", icon: <PenTool className="h-4 w-4" /> });
  }
  if (is_author) {
    tabs.push({ value: "submit_book", label: "Enviar Livro", icon: <Send className="h-4 w-4" /> });
  }
  if (is_admin) {
    tabs.push({ value: "admin_requests", label: "Solicitações", icon: <PenTool className="h-4 w-4" /> });
    tabs.push({ value: "admin_users", label: "Usuários", icon: <Users className="h-4 w-4" /> });
    tabs.push({ value: "admin_books", label: "Livros", icon: <BookOpen className="h-4 w-4" /> });
    tabs.push({ value: "admin_submissions", label: "Aprovações", icon: <CheckCircle className="h-4 w-4" /> });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Minha Conta</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1 flex-wrap h-auto gap-1">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="gap-2">
                {t.icon} {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar with file input */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-border">
                    {avatar_url ? (
                      <img src={avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-muted-foreground" />
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                      <Camera className="h-5 w-5 text-primary-foreground" />
                      <input type="file" accept="image/*" className="hidden" onChange={handle_avatar_file} />
                    </label>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Foto de Perfil</p>
                    <p className="text-xs text-muted-foreground">Clique na imagem para trocar</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Nome</label>
                    <Input value={name} onChange={(e) => set_name(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</label>
                    <Input value={email} onChange={(e) => set_email(e.target.value)} type="email" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Telefone</label>
                    <Input value={phone} onChange={(e) => set_phone(e.target.value)} placeholder="(00) 00000-0000" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Endereço</label>
                    <Input value={address} onChange={(e) => set_address(e.target.value)} placeholder="Rua, número, cidade" className="mt-1" />
                  </div>
                </div>

                {/* Dark mode */}
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    {is_dark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-accent" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">Tema Escuro</p>
                      <p className="text-xs text-muted-foreground">Ativar modo noturno</p>
                    </div>
                  </div>
                  <Switch checked={is_dark} onCheckedChange={toggle_theme} />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{user.role === "admin" ? "Administrador" : user.role === "author" ? "Autor" : "Usuário"}</Badge>
                </div>

                <Button onClick={save_profile} className="w-full sm:w-auto">Salvar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AUTHOR REQUEST TAB */}
          {!is_author && (
            <TabsContent value="author">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><PenTool className="h-5 w-5" /> Solicitar Direito de Autor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user_request ? (
                    <div className="rounded-lg border border-border p-6 text-center space-y-2">
                      <Clock className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-foreground font-medium">Sua solicitação foi enviada</p>
                      <p className="text-sm text-muted-foreground">Status: {status_badge(user_request.status)}</p>
                      {user_request.status === "rejected" && (
                        <p className="text-sm text-destructive">Sua solicitação foi negada. Você pode tentar novamente.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">Explique por que você gostaria de se tornar um autor na plataforma.</p>
                      <textarea
                        value={author_reason}
                        onChange={(e) => set_author_reason(e.target.value)}
                        placeholder="Conte-nos sobre sua experiência como escritor, gêneros que escreve, obras publicadas..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px] resize-none"
                      />
                      <Button onClick={handle_author_request} disabled={!author_reason.trim()}>
                        <Send className="h-4 w-4 mr-2" /> Enviar Solicitação
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* BOOK SUBMISSION TAB */}
          {is_author && (
            <TabsContent value="submit_book">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><BookOpen className="h-5 w-5" /> Enviar Livro para Publicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">O livro será revisado pela equipe antes de ser publicado.</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">Título</label>
                      <Input value={book_title} onChange={(e) => set_book_title(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Categoria</label>
                      <select
                        value={book_category}
                        onChange={(e) => set_book_category(e.target.value)}
                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Preço (R$)</label>
                      <Input type="number" value={book_price} onChange={(e) => set_book_price(e.target.value)} placeholder="29.90" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">URL da Capa</label>
                      <Input value={book_cover} onChange={(e) => set_book_cover(e.target.value)} placeholder="https://..." className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Sinopse</label>
                    <textarea
                      value={book_synopsis}
                      onChange={(e) => set_book_synopsis(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px] resize-none"
                      placeholder="Uma breve descrição do livro..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Conteúdo das Páginas</label>
                    <p className="text-xs text-muted-foreground mb-1">Separe cada página com <code className="bg-secondary px-1 rounded">---</code></p>
                    <textarea
                      value={book_pages_text}
                      onChange={(e) => set_book_pages_text(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[200px] resize-y font-mono"
                      placeholder={"Capítulo 1\n\nTexto da primeira página...\n\n---\n\nCapítulo 2\n\nTexto da segunda página..."}
                    />
                  </div>

                  <Button onClick={handle_book_submit} className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" /> Enviar para Aprovação
                  </Button>

                  {/* My submissions */}
                  {book_submissions.filter((s) => s.author_id === user.id).length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <h3 className="text-lg font-semibold text-foreground">Meus Envios</h3>
                      <div className="space-y-2">
                        {book_submissions.filter((s) => s.author_id === user.id).map((s) => (
                          <div key={s.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                            <div>
                              <p className="text-sm font-medium text-foreground">{s.title}</p>
                              <p className="text-xs text-muted-foreground">{s.category} · {s.created_at}</p>
                            </div>
                            {status_badge(s.status)}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* ADMIN: AUTHOR REQUESTS */}
          {is_admin && (
            <TabsContent value="admin_requests">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">Solicitações de Autor</CardTitle>
                    <div className="flex gap-2">
                      <Button variant={requests_filter === "pending" ? "default" : "outline"} size="sm" onClick={() => set_requests_filter("pending")}>Pendentes</Button>
                      <Button variant={requests_filter === "all" ? "default" : "outline"} size="sm" onClick={() => set_requests_filter("all")}>Todas</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filtered_requests.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Nenhuma solicitação encontrada.</p>
                  ) : (
                    <div className="space-y-3">
                      {filtered_requests.map((r) => (
                        <div key={r.id} className="rounded-lg border border-border p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{r.user_name}</p>
                              <p className="text-xs text-muted-foreground">{r.user_email} · {r.created_at}</p>
                            </div>
                            {status_badge(r.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{r.reason}</p>
                          {r.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => update_author_request(r.id, "approved")} className="gap-1">
                                <CheckCircle className="h-3.5 w-3.5" /> Aprovar
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => update_author_request(r.id, "rejected")} className="gap-1">
                                <XCircle className="h-3.5 w-3.5" /> Recusar
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* ADMIN: USERS */}
          {is_admin && (
            <TabsContent value="admin_users">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">Usuários Cadastrados</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={users_search}
                        onChange={(e) => { set_users_search(e.target.value); set_users_page(1); }}
                        placeholder="Pesquisar usuários..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {paginated_users.map((u) => (
                      <div key={u.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email} · <span className="capitalize">{u.role}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={u.is_active ? "default" : "secondary"} className="text-xs">
                            {u.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Switch checked={u.is_active} onCheckedChange={() => toggle_user_active(u.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {users_total_pages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => set_users_page((p) => Math.max(1, p - 1))} disabled={users_page === 1}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">{users_page} / {users_total_pages}</span>
                      <Button variant="outline" size="sm" onClick={() => set_users_page((p) => Math.min(users_total_pages, p + 1))} disabled={users_page === users_total_pages}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* ADMIN: BOOKS */}
          {is_admin && (
            <TabsContent value="admin_books">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">Todos os Livros</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={books_search}
                        onChange={(e) => { set_books_search(e.target.value); set_books_page(1); }}
                        placeholder="Pesquisar livros..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {paginated_books.map((b) => (
                      <div key={b.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <img src={b.cover_url} alt={b.title} className="h-12 w-9 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{b.title}</p>
                          <p className="text-xs text-muted-foreground">{b.author} · {b.category}</p>
                        </div>
                        <Badge variant="outline">R$ {b.price.toFixed(2)}</Badge>
                      </div>
                    ))}
                  </div>
                  {books_total_pages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => set_books_page((p) => Math.max(1, p - 1))} disabled={books_page === 1}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">{books_page} / {books_total_pages}</span>
                      <Button variant="outline" size="sm" onClick={() => set_books_page((p) => Math.min(books_total_pages, p + 1))} disabled={books_page === books_total_pages}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* ADMIN: BOOK SUBMISSIONS / APPROVALS */}
          {is_admin && (
            <TabsContent value="admin_submissions">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">Livros para Aprovação</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={submissions_search}
                        onChange={(e) => set_submissions_search(e.target.value)}
                        placeholder="Pesquisar..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filtered_submissions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Nenhum envio encontrado.</p>
                  ) : (
                    <div className="space-y-3">
                      {filtered_submissions.map((s) => (
                        <div key={s.id} className="rounded-lg border border-border p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <img src={s.cover_url} alt={s.title} className="h-16 w-12 rounded object-cover" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">{s.title}</p>
                                {status_badge(s.status)}
                              </div>
                              <p className="text-xs text-muted-foreground">{s.author_name} · {s.category} · R$ {s.price.toFixed(2)} · {s.created_at}</p>
                              <p className="text-xs text-muted-foreground mt-1">{s.synopsis.substring(0, 120)}...</p>
                              <p className="text-xs text-muted-foreground">{s.pages.length} páginas</p>
                            </div>
                          </div>
                          {s.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => update_book_submission(s.id, "approved")} className="gap-1">
                                <CheckCircle className="h-3.5 w-3.5" /> Aprovar
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => update_book_submission(s.id, "rejected")} className="gap-1">
                                <XCircle className="h-3.5 w-3.5" /> Rejeitar
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
