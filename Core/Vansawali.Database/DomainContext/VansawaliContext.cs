using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Vansawali.DataBase.DomainModel;

namespace Vansawali.DataBase.DomainContext
{
    public partial class VansawaliContext : DbContext
    {
        // public VansawaliContext()
        // {
        // }

        public VansawaliContext(DbContextOptions<VansawaliContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PersonHistory> PersonHistory { get; set; }
        public virtual DbSet<PersonImage> PersonImage { get; set; }
        public virtual DbSet<PersonMobile> PersonMobile { get; set; }
        public virtual DbSet<Relation> Relation { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<UserLogin> UserLogin { get; set; }
        public virtual DbSet<Village> Village { get; set; }

//         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//         {
//             if (!optionsBuilder.IsConfigured)
//             {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                 optionsBuilder.UseSqlServer("Server=LP-5CD8071S2R\\SQLEXPRESS;Database=Sajara;Trusted_Connection=True;");
//             }
//         }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => e.PersonId);

                entity.HasIndex(e => e.Id)
                    .HasName("UQ__Person__3214EC06E136671A")
                    .IsUnique();

                entity.HasIndex(e => new { e.PersonId, e.Name, e.RelationId, e.Gender, e.ParentId })
                    .HasName("wife_ParentId");

                entity.Property(e => e.PersonId).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.LiveTill).HasColumnType("datetime");

                entity.Property(e => e.MarriageDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.ShortDesc).HasMaxLength(500);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__Person__CreatedB__24927208");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK__Person__ParentId__21B6055D");

                entity.HasOne(d => d.Relation)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.RelationId)
                    .HasConstraintName("FK__Person__Relation__239E4DCF");

                entity.HasOne(d => d.Village)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.VillageId)
                    .HasConstraintName("FK__Person__VillageI__22AA2996");
            });

            modelBuilder.Entity<PersonHistory>(entity =>
            {
                entity.HasKey(e => e.HistoryId);

                entity.Property(e => e.History).HasMaxLength(4000);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.PersonHistory)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK__PersonHis__Perso__36B12243");
            });

            modelBuilder.Entity<PersonImage>(entity =>
            {
                entity.HasKey(e => e.ImageId);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.PersonImage)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK__PersonIma__Perso__2B3F6F97");

                entity.HasOne(d => d.UploadByNavigation)
                    .WithMany(p => p.PersonImage)
                    .HasForeignKey(d => d.UploadBy)
                    .HasConstraintName("FK__PersonIma__Uploa__2C3393D0");
            });

            modelBuilder.Entity<PersonMobile>(entity =>
            {
                entity.HasKey(e => e.MobileNo);

                entity.Property(e => e.MobileNo)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.PersonMobile)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK__PersonMob__Perso__2F10007B");

                entity.HasOne(d => d.UploadByNavigation)
                    .WithMany(p => p.PersonMobile)
                    .HasForeignKey(d => d.UploadBy)
                    .HasConstraintName("FK__PersonMob__Uploa__300424B4");
            });

            modelBuilder.Entity<Relation>(entity =>
            {
                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.Relation1)
                    .HasColumnName("Relation")
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.RoleText)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserLogin>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__UserLogi__1788CC4D4F5D1C56")
                    .IsUnique();

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserPass)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserLogin)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__UserLogin__RoleI__164452B1");
            });

            modelBuilder.Entity<Village>(entity =>
            {
                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.History).HasMaxLength(4000);

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.VillageName).HasMaxLength(200);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Village)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__Village__Created__1A14E395");
            });
        }
    }
}
